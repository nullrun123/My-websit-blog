import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useBlogStore } from "@/lib/blog-store"
import { toast } from "sonner";

export function AlertDelbtn({id}:{id:string}) {
    const deleteBlog  = useBlogStore((state)=>state.deleteBlog);
    const setError  = useBlogStore((state)=>state.setError);
    const error = useBlogStore((state)=>state.error);

    const deletefunc = async() =>{
      await deleteBlog(id);
      
    
      if(error){
        console.log(error);
      }else{
        toast.success("Blog has been delete", { position: "top-center" })
        setTimeout(()=> window.location.reload(),1000);
      
      }
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
          <AlertDialogDescription>
           delete Blog?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={deletefunc}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}