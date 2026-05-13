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
import { requestPasswordReset } from "@/lib/auth-client"
import { useState } from "react"

import Link from "next/link"
import {  formSchemaEmail } from "@/types/SchemaZod"

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
   const [success, setSuccess] = useState<string | null>('');
  const form = useForm<z.infer<typeof formSchemaEmail>>({
    resolver: zodResolver(formSchemaEmail),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchemaEmail>) {
    setIsLoading(true);
    console.log("🚀 FORM SUBMITTED!", data);
    setError(null);
    setSuccess(null);
    const { email } = data;
   
    const { error } = await requestPasswordReset({
      email,
      redirectTo:'/reset-password'
    })
    setIsLoading(false);
    if(error){
        setError(error.message || 'Something is wrong')
        return;
    }else{
       setSuccess("Send reset password your email. go check");
    } 
  }

  

  return (
    <div className="w-full h-screen flex-center ">
    <Card className="w-full max-w-sm gap-6">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email to send reset your password.
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href={'/signin '}>go back</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-center">
  <FieldSet className="w-full max-w-xs">
      <FieldGroup className="space-y-4"> 
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
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {
              success && (
                 <div role="alert" className="text-sm text-green-300">
                {success}
              </div>
              )
            }
            {
              error && (
                 <div role="alert" className="text-sm text-red-60">
                {error}
              </div>
              )
            }
       <div className="flex-col space-y-3"> 
         <Button disabled={isLoading} type="submit" className="bg-white text-black cursor-pointer w-full" aria-label="Submit" variant="default">Send</Button>
        </div>       
     
      </FieldGroup>
    </FieldSet>
    </form>
      </CardContent>
    </Card>
   </div>
  )
}

