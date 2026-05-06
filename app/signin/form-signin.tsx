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
import { signIn } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
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
    .refine((val) => /[!@#$%^&*]/.test(val), { message: "Password must contain at least one special character" })
})

export function FormSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const router= useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null);
    setIsLoading(true);
    const { email, password } = data;

    const { error } = await signIn.email({
      email,
      password,
    })

    setIsLoading(false);
    if(error){
        setError(error.message || 'Something is wrong')
        return;
    }else{
      router.push('/blog')
    } 

    
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
     <form onSubmit={form.handleSubmit(onSubmit)}>
  <FieldSet className="w-full max-w-xs p-2">
      <FieldGroup className="space-y-3"> 
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
                    placeholder="Login button not working on mobile"
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
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
         
                </Field>
              )}
            />

            {
              error ?? (
                 <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
              )
            }

       <div className="flex-col space-y-2"> 
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

