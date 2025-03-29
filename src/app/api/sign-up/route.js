import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';
import dbConnect from "../../lib/dbConnect";
import UserModel from "../../models/User.model";

export async function POST(req){
    await dbConnect();

    try {
        const {name, email, password, phone } = await req.json();
        
        const existingUserByEmail = await UserModel.findOne({ email });
        const existingUserByPhone = await UserModel.findOne({ phone });

        if(existingUserByEmail){
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 400 }
            );
        }
        if(existingUserByPhone){
            return NextResponse.json(
                { success: false, message: "User with this phone already exists" },
                { status: 400 }
            );
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();  
        expiryDate.setHours(expiryDate.getHours() +1);
        const newUser = new UserModel({
            name,
            email,
            phone,
            password: hashedPassword,
        })
        console.log(newUser);
        
        await newUser.save();
        
        return NextResponse.json(
            {
                success: true, 
                message: "User Registered successfully."
            },
            { status: 201 }
        )

    } catch (error) {
        console.log("Error registering user, ", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            { status: 500 }
        );
    }
}
