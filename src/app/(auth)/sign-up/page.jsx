'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

function Page() {
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/sign-up', data);
      console.log(response);
      
      // toast((response.success) ? 'Success' : 'Failure', {
      //   description: response.data.message
      // });

      if (response.data.success) {
        router.replace(`/sign-in`);
        setIsSubmitting(false);
      } else {
        const error = response.data.message;
        console.error("Error in signup of user, ", error);
        toast.error('SignUp Failed, Please try again', {
          description: error,
        })
      }
    } catch (error) {
      console.error("Error in signup of user, ", error);
      const axiosError = error;
      const errorMessage = axiosError.response?.data.message;
      toast.error('SignUp Failed, Please try again', {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false);
    }
  }

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
            Create Account
          </h1>
          <p className="mb-4 text-gray-600 italic">
            Start your personalized travel journey today
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="bg-orange-50 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="email"
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
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
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
                      placeholder="Create a password"
                      {...field}
                      className="bg-orange-50 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                    />
                  </FormControl>
                  {isCheckingPassword &&
                    <Loader2 className="animate-spin text-orange-400" />
                  }
                  <p className={`text-sm ${passwordMessage == "Valid Password" ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="pt-2">
              <Button
                type='submit'
                className='w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer transition-colors duration-300 font-semibold py-3'
                disabled={isSubmitting}
              >
                {
                  isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (<>Create Account</>)
                }
              </Button>
            </motion.div>
          </form>
        </Form>

        <div className="text-center mt-4 pt-4 border-t border-orange-100">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-orange-600 hover:text-orange-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-gray-500 mt-2">
          <p>AI-powered itineraries for unforgettable journeys</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Page