'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload";
import FileAvatar from "@/components/file-upload-special-1";
import { User } from "@/lib/auth";
import { updateUser } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const MAX_FILE_SIZE = 5000000 
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
]

 const formSchemaImage = z.object({
  image: z
    .any()
    .refine((files) => files?.length >= 1, { message: 'Image is required.' })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: '.jpg, .jpeg, .png, .webp and .svg files are accepted.',
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
})

interface ProfileImageProps{
  user:User
}

function ProfileImage({user}:ProfileImageProps) {
  const [error, setError] = useState("");
    
    const form = useForm<z.infer<typeof formSchemaImage>>({
    resolver: zodResolver(formSchemaImage),
    defaultValues: {
        image: user?.image ?? ""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchemaImage>) {
  const { image } = data;

  // แปลง File[] → base64 string ก่อน
  const base64Image = await handleImageChange(image);

  const { error } = await updateUser({
    image: base64Image
  });

  if (error) {
    setError("Failed to upload image.");
    return;
  }

  toast.success("Profile updated", { position: "top-center" });
  setTimeout(() => window.location.reload(), 1000);
}

async function handleImageChange(files: File[]): Promise<string> {
  const file = files?.[0];
  if (!file) return "";

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}


  
  return (
    <div className='w-full min-h-full border-2 flex-center p-6 gap-8'>
     
    <div className="w-full h-full flex-center">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>

        <Controller
          name="image"
          control={form.control}
          render={({ field }) => (

            <FileAvatar
              value={Array.isArray(field.value) ? field.value : []}
              onValueChange={(files) => field.onChange(files)}
              currentImage={user?.image ?? undefined}
            />
            
          )}
        />
      <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo" className="w-full mt-3">
            Submit
          </Button>
        </Field>
            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}
        </form>
    </div>
</div>

  )
}

export default ProfileImage
