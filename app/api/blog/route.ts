import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";



export async function GET(){
    
    try{
        const data = await prisma.blog.findMany({
            orderBy:{
                createAt: 'desc'
            }
        })

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



export async function POST(resquet:NextRequest){

    try{
        const blog = await resquet.json();
        const { title,text } = blog;

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if(!session){
            return NextResponse.json({
                success:false,
                error:"Failed to create blog",
                status:400, 
            })
        }
        

        if(!title || title.trim() === "" || !text || text.trim() === ""){
            return NextResponse.json({
                success:false,
                error:"Failed to create blog",
                status:400,
         })
        }

        const blogdata = await prisma.blog.create({
            data:{
                title:title.trim(),
                text:text.trim(),
                userId: session.user.id,
            }
        })

        return NextResponse.json({
            success:true,
            data:blogdata,
        })

    }catch(error){
        console.error("Error POST blog :",error);
        return NextResponse.json({
                success:false,
                error: "Failed to create blog ",
                status:500,
        })
    }
}