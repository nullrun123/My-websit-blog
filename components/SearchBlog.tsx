'use client'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export function SearchInput() {
    const router = useRouter();
    const pathname = usePathname();          
    const searchParams = useSearchParams();

    const handleSearch = (term: string)=>{
        const params = new URLSearchParams(searchParams);
        
        if(term){
            params.set('query',term);
        }else{
            params.delete('query');
        }
        router.replace(`${pathname}?${params.toString()}`)
      }
  return (
    <Field orientation="horizontal" className="flex-center">
      <Input onChange={(e)=>{
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
       className="w-4/5" type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
