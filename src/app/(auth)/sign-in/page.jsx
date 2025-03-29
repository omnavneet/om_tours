'use client'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            
            const result = await signIn('credentials', {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            });

            console.log(result);
            

            if (result?.error) {
                console.error("Login Failed:", result?.error);
            }

            if (result?.url) {
                router.replace('/dashboard');
            }
        } catch (error) {
            console.error("Error signing in:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-orange-50 bg-fixed overflow-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg my-8 border border-orange-100 relative"
            >
                {/* <div className="absolute -top-4 -left-4 h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 h-12 w-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Compass className="h-6 w-6 text-white" />
                </div> */}

                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4 text-gray-800">
                        Welcome Back
                    </h1>
                    <p className="mb-4 text-gray-600 italic">
                        Sign in to continue your personalized travel journey
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email address"
                                            {...field}
                                            className="bg-orange-50 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder="Enter your password"
                                            {...field}
                                            className="bg-orange-50 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                type='submit'
                                className='w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer transition-colors duration-300 font-semibold py-3'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : (
                                    <>Sign In</>
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </Form>

                <div className="text-center mt-4 pt-4 border-t border-orange-100">
                    <p className="text-gray-600">
                        Don&apos;t have an account?&nbsp;
                        <Link href="/sign-up" className="text-orange-600 hover:text-orange-500 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="text-center text-xs text-gray-500 mt-2">
                    <p>AI-powered itineraries for unforgettable journeys</p>
                </div>
            </motion.div>
        </div>
    );
}

export default Page;