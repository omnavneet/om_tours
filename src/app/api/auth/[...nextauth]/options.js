import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/User.model';

export const authOptions = {
    providers: [
        CredentialProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "Email must be unique" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { phone: credentials.identifier }
                        ]
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error('Incorrect password');
                    }
                } catch (error) {
                    throw new Error(err);
                }
            }
        }),
    ],
    pages: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        signOut: '/'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.email = user.email;
                token.name = user.name;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    _id: token._id,
                    name: token.name,
                };
            }
            return session
        },
    },
}
