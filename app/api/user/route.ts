import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    
    try{
        const data = await prisma.user.findMany()

        return NextResponse.json({
            success:true,
            data:data,
        })
        
    }catch(error){
        console.error("Error fetch blog : ",error);
        return NextResponse.json({
            success:false,
            error:"Failed to fetch blog",
            status:500,
        })
    }
}
