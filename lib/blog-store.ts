// store.ts
import { TypeBlog } from '@/types/tblog'
import { create } from 'zustand'

interface blogProps{
    title:string
    text:string
}
// Define types for state & actions
interface BlogState {

  blogs: TypeBlog[]
  isLoading: boolean
  error:string | null

    fetchBlog: ()=>Promise<void>
    getBlog:(id:string) => Promise<void>
    addBlog: ({title,text}:blogProps) => void
    deleteBlog:(id:string) => Promise<void>
    updateBlog: (id:string,data: {title?:string,text?:string}) => Promise<void>

    // helper
    setIsloading: (loading:boolean)=>void
    setError:(error:string | null)=>void

    getBlogstats:()=>void

    

}

// Create store using the curried form of `create`
export const useBlogStore = create<BlogState>((set,get) => ({
    
    blogs:[],
    isLoading:false,
    error:null,


    setIsloading:(loading:boolean)=> set({isLoading:false}),
    setError: (error:string| null)=> set({error}),


    fetchBlog: async()=>{
        set({isLoading:true,error:null});
        try{
            const res = await fetch('/api/blog')
            const result = await res.json()


            if(result.success){
                set({blogs:result.data,isLoading:false})
            }else{
                set({ error: result.error, isLoading: false })
            }

            
        }catch(error){
            set({
                error:"Failed to fetch blog",isLoading:false
            })
            console.error("error to fetch blog",error)
        }   
        

        
    },
    getBlog: async(id:string)=>{
          set({isLoading:true,error:null});
          try{
            const res = await fetch(`/api/blog/${id}`,{
               method:"GET"
            })

            const result = await res.json();

              if(result.success){
                set({isLoading:false})
                return result.data;
            }else{
                set({ error: result.error, isLoading: false })
                 return null; 
            }
          }catch(error){
             set({
                error:"Failed to fetch blog",isLoading:false
            })
            console.error("error to fetch blog",error)
             return null; 
          }
    },



    addBlog: async({title,text}:blogProps)=>{
        set({isLoading:true,error:null});

        try{

            
            const newdata = {
                title,
                text
            }

            const res = await fetch('/api/blog',{
                method:"POST",
                 headers: { 'Content-Type': 'application/json' }, 
                 body:JSON.stringify(newdata)
            })

            const result = await res.json()

            if(result.success){
                set((state) => ({
                blogs: [...state.blogs, result.data],
                isLoading: false
                }))
            }else{
               set({error: result.error, isLoading:false})
            }

        }catch(error){
            set({
                error:"Failed to create blog",isLoading:false
            })
            console.error("error to create blog",error)
        }   
    },

    deleteBlog: async(id:string)=>{
        set({isLoading:true,error:null});

        const originalBlog  = get().blogs;

        set((state)=>({
            blogs: state.blogs.filter(s => s.id !== id)
        }))

        try{
            const res = await fetch(`/api/blog/${id}`,{
                method:"DELETE"
            })
            const result = await res.json();

            if(result.success){
                set({
                    isLoading:false                
                })
            }else{
                set({
                    blogs:originalBlog,isLoading:false,error:result.error
                })
            }


        }catch(error){
             set({
                error:"Failed to delete blog",isLoading:false
            })
            console.error("error to delete blog",error)
        }
    }    ,


    updateBlog: async(id:string,data: {title?:string,text?:string})=>{
         set({isLoading:true,error:null});

         const originalBlog = get().blogs;

         set((state)=>({
            blogs: state.blogs.map(blog => blog.id === id ? {...blog,...data} : blog)
         }))

        
        try{
            const res = await fetch(`/api/blog/${id}`,{
                method:"PUT",
                headers: { 'Content-Type': 'application/json' }, 
                 body:JSON.stringify(data)
            })
            const result = await res.json();

            if(result.success){
                const newdata = result.data
                set((state)=>({
                    blogs: state.blogs.map(b=>b.id === id ? newdata : b),isLoading:false
                }))

            }else{
                  set({
                    blogs: originalBlog,isLoading:false,error:result.error
            })
            }
        }catch(error){
                set({
                error:"Failed to update blog",isLoading:false
            })
            console.error("error to update blog",error) 
        }
    },

    getBlogstats:()=>{
        const data = get().blogs;

        return {
            total: data.length,

        }
    },
}))