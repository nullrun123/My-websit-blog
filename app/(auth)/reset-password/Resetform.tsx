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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { useState } from "react"
import { useRouter } from "next/navigation"


import { Metadata } from "next"
import { formSchemaPassword } from "@/types/SchemaZod"
import { resetPassword } from "@/lib/auth-client"

export const metadat: Metadata ={
    title:"Reset Password"
}

interface ResetPasswordProps {
    token : string
}

export default  function Resetform({token}:ResetPasswordProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [success, setSuccess] = useState<string | null>('');
  const router= useRouter();
  const form = useForm<z.infer<typeof formSchemaPassword>>({
    resolver: zodResolver(formSchemaPassword),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchemaPassword>) {
    setSuccess(null);
    setError(null);

    const { password } = data;
    const { error } = await resetPassword({
        newPassword: password,
        token: token,
    })
    setIsLoading(false);
    if(error){
        setError(error.message || 'Something is wrong')
        return;
    }else{
        setSuccess("Password has been reset. You can now sign in");
        setTimeout(()=> router.push('/signin'),2000)
    } 
  }

  

  return (
    <div className="w-full h-screen flex-center ">
  
 <Card className="w-full max-w-sm gap-6">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-center">
  <FieldSet className="w-full max-w-xs">
      <FieldGroup className="space-y-4"> 
     <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-password">
                    New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
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
         <Button disabled={isLoading} type="submit" className="bg-white text-black cursor-pointer w-full" aria-label="Submit" variant="default">submit</Button>
        </div>       
     
      </FieldGroup>
    </FieldSet>
    </form>
      </CardContent>
    </Card>
   
   
   </div>
  )
}

