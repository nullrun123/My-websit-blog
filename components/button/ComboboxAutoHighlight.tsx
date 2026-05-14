"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { User } from "@/lib/auth";
import { useState } from "react";
interface userRole{
  id:string
  role:string
}
const frameworks = [
  "user",
  "admin",
] as const

export function ComboboxAutoHighlight({id,role}:userRole) {

  const [selected, setSelected] = useState<string>(role);
  const handlerole = async(newValue: string)=>{

    try{
     
      const res = await fetch(`/api/user/${id}`,{
        method:"PUT",
        headers: { 'Content-Type': 'application/json' }, 
        body:JSON.stringify({role:newValue})
      })
      const response = await res.json();
      if(response.success){
        setTimeout(()=>window.location.reload(),500);
      }

    }catch(error){
      console.log(error || 'Failed to update role')
    }

  }

  
  return (
    <Combobox items={frameworks} 
    value={selected}
    onValueChange={(value)=>{
      setSelected(value)
      handlerole(value)
    }} >
      <ComboboxInput placeholder="Select a framework" className="scale-80 md:scale-100 w-25"/>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
