'use client'
import { User } from '@/lib/auth'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { updateUser } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';


const formSchemaUser = z.object({
  name: z
    .string()
    .min(2,"username must be at least 5 characters.")
    .max(30,"username must be at most 30 characters.")

})
interface ChangerUserProps{
    user:User
}
function ChangeUser({user}:ChangerUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [success, setSuccess] = useState<string | null>('');
    const form = useForm<z.infer<typeof formSchemaUser>>({
        resolver: zodResolver(formSchemaUser),
        defaultValues: {
          name: user.name ?? '',
        },
      })
    
      async function onSubmit(data: z.infer<typeof formSchemaUser>) {
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        const { name } = data;
    
        const { error } = await updateUser({
            name,
        })
        setIsLoading(false);
        if(error){
            setError(error.message || 'Something is wrong')
            return;
        }else{
          setSuccess('changed username success.');  
        } 
    
        
      }
  return (
    <div>
       <form onSubmit={form.handleSubmit(onSubmit)}>
  <FieldSet className="w-full px-1">
      <FieldGroup className="w-full"> 
             <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
               
                  <FieldLabel htmlFor="form-password">
                    Username
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

export default ChangeUser
