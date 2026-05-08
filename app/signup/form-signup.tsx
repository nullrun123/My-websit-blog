"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { sendVerificationEmail, signIn, signUp } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
const formSchema = z.object({
    name: z
        .string()
        .min(1,{message: "name must be at least 1 characters long"}),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters" })
    .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
    .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
    .refine((val) => /[0-9]/.test(val), { message: "Password must contain at least one number" })
    .refine((val) => /[!@#$%^&*]/.test(val), { message: "Password must contain at least one special character" }),
    passwordConfirmation: z
                        .string()
                        .min(1,'Please Confirm your password'),  
})  .refine((data)=> data.password === data.passwordConfirmation,{
    message:"Password is not match",
    path:["passwordConfirmation"],
})

export function FormSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [verified, setVerified] = useState<string | null>('');
  const router= useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name:"",
        email: "",
        password: "",
        passwordConfirmation: ""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null);
    setVerified(null);
    setIsLoading(true);
    const { email, password , name } = data;

    const { error } = await signUp.email({
        name,
        email,
        password,
        
    })



    setIsLoading(false);
    if(error){
        setError(error.message || 'Something is wrong')
        return;
    }else{
        await sendVerificationEmail({
            email,
            callbackURL:'/email-verified'
     })
      setVerified('go to verified your email');  
    } 

    
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href={'/signin '}>Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
     <form onSubmit={form.handleSubmit(onSubmit)}>
  <FieldSet className="w-full px-1">
      <FieldGroup className="w-full"> 
         <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Don"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

     <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

             <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
               
                  <FieldLabel htmlFor="form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="*****"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
         
                </Field>
              )}
            />

            <Controller
              name="passwordConfirmation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-passwordConfirmation">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-passwordConfirmation"
                    aria-invalid={fieldState.invalid}
                    placeholder="password confirm"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

              {
              verified && (
                 <div role="alert" className="text-sm text-green-600">
                {verified}
              </div>
              )
            }

            {
              error && (
                 <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
              )
            }
       

       <div className=" mt-2 flex-col space-y-2"> 
         <Button type="submit" className="bg-white text-black cursor-pointer w-full" aria-label="Submit" variant="default">Sign In</Button>
        <Button variant="outline" className="w-full" disabled={isLoading}>
          Login with Google
        </Button>
        </div>       
     
      </FieldGroup>
    </FieldSet>
    </form>
      </CardContent>
    </Card>
   
  )
}

