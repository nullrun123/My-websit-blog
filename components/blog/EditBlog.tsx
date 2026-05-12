"use client"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '../ui/input-group';
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from '../ui/file-upload';
import { CloudUpload, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useBlogStore } from '@/lib/blog-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './CreateBlog';
import { toast } from 'sonner';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { TypeBlog } from '@/types/tblog';
import Image from 'next/image'
interface EditblogProps {
    id:string
    title:string
    text:string
    image:string
}
function EditBlog({id,title,text,image}:EditblogProps) {
    const updateBlog = useBlogStore((state)=>state.updateBlog);
    const isLoading = useBlogStore((state)=>state.isLoading);
    const router = useRouter();
    
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: title ?? '',
          text: text ?? '',
            image:undefined,
        },
      })
    
    function onSubmit(data: z.infer<typeof formSchema>) {
          const {title,text,image} = data;
          
            updateBlog(id, {title, text, image: image[0]});
    
          toast.success("Blog has been updated", { position: "top-center" })
    
          return router.push('/blog')
      }
  return (
    <div className='w-full h-full flex-center flex-col p-12 gap-5 relative'>
       <div className='w-full max-w-2xl mt-5  border-2 border-red-'>
            <div className='relative h-96 w-full flex-center border-6'>
                <Image
                    className='object-cover'
                    src={image ?? "/placeholder.png"}
                    fill         
                    alt="Picture of the author"
                />
            </div>
        </div>
        <form className='w-full' id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
        control={form.control}
        name="image"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Attachments</FieldLabel>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={2}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => {
                form.setError("image", { message });
              }}
              multiple
            >
              <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                <CloudUpload className="size-4" />
                <span className="text-sm">Drag and drop or</span>
                <FileUploadTrigger asChild>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    choose files
                  </Button>
                </FileUploadTrigger>
                <span className="text-sm">to upload</span>
              </FileUploadDropzone>
              <FileUploadList>
                {Array.isArray(field.value) &&  field.value?.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X className="size-4" />
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
            <FieldDescription>
              Upload up to 2 images (max 5MB each)
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                  
                    autoComplete="off"
                     autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="text"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Detail
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                     
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                     
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
              
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" disabled={isLoading}>
            Submit
          </Button>
        </Field>
     
             
          </FieldGroup>
        </form>
    </div>
  )
}

export default EditBlog
