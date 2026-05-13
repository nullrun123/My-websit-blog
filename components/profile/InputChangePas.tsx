"use client"

import React, { useState } from 'react'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '../ui/field'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import z, { success } from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePassword } from '@/lib/auth-client'
import { formchangePassword } from '@/types/SchemaZod'
import { Button } from '../ui/button'


function InputChangePas() {
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [success, setSuccess] = useState<string | null>('');
    const form = useForm<z.infer<typeof formchangePassword>>({
        resolver: zodResolver(formchangePassword),
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        },
      })
    
      async function onSubmit(data: z.infer<typeof formchangePassword>) {
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        const { currentPassword,newPassword } = data;
    
        const { error } = await changePassword({
            currentPassword,
            newPassword
        })
        setIsLoading(false);
        if(error){
            setError(error.message || 'Something is wrong')
            return;
        }else{
          setSuccess('changed password success.');  
        } 
    
        
      }
  return (
    <div>
       <form onSubmit={form.handleSubmit(onSubmit)}>
  <FieldSet className="w-full px-1">
      <FieldGroup className="w-full"> 
             <Controller
              name="currentPassword"
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
              name="newPassword"
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
              success && (
                 <div role="alert" className="text-sm text-green-600">
                {success}
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
         <Button type="submit" className="bg-white text-black cursor-pointer w-full" aria-label="Submit" variant="default">change</Button>
        </div>       
     
      </FieldGroup>
    </FieldSet>
    </form>
    </div>
  )
}

export default InputChangePas
