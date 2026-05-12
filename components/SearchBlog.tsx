'use client'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ButtonFilterDate from "./button/ButtonFilterDate";

export function SearchInput() {
  // มีpathname ปัจจุบัน  searchParams ที่เรากำลังเขียน
    const router = useRouter();
    const pathname = usePathname(); 
  // useSearchParams() คือ React Hook ที่ใช้สำหรับ อ่านและแก้ไข query string ใน URL
  // เช่นใน url มี keyword="" ถ้าเราเลือก searchParams.get("keyword") จะได้ข้อมูลkeyword มา  
    const searchParams = useSearchParams();
    const handleSearch = (term: string)=>{
    // new URLSearchParams(searchParams) คือการ สร้าง object ใหม่ จาก searchParams เพื่อให้แก้ไขได้
        const params = new URLSearchParams(searchParams);
        if(term){
          // ค่าเริ่มต้น
            params.set('query',term);
        }else{
          // ถ้าลย ใน query หมด ให้ ลบ query ทิ้ง
            params.delete('query');
        }
        //  รีหน้าใหม่ ของ query ที่เจอ โดยใช้path หน้าปัจจุบัน กับ params ใหม่ที่สร้างมา
        router.replace(`${pathname}?${params.toString()}`)
      }
  return (
    <Field orientation="horizontal" className="flex-center">
      {/* input search */}
      <Input onChange={(e)=>{
        handleSearch(e.target.value);
      }}
      // ค่าเริ่มต้นตอนเริ่ม
      defaultValue={searchParams.get('query')?.toString()}
       className="w-4/5" type="search" placeholder="Search..." />
      <Button>Search</Button>
      <ButtonFilterDate/>
    </Field>
  )
}
