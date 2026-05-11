import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";



export async function GET(){
    
    try{
        const data = await prisma.blog.findMany({
            include:{
                user:true,
            },
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
        const { title,text,image,user } = blog;

        if(!user){
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

        // Validate base64 image if provided
        let imageData: string | null = null;
        if (image) {
            // Check if it's a valid base64 image string
            if (typeof image === 'string' && image.startsWith('data:image/')) {
                imageData = image;
            } else {
                return NextResponse.json({
                    success:false,
                    error:"Invalid image format",
                    status:400,
                })
            }
        }

        // Prepare blog data with conditional image field
        const blogData: any = {
            title: title.trim(),
            text: text.trim(),
            userId: user.id,
        };
        
        // Only add image if it exists
        if (imageData) {
            blogData.image = imageData;
        }

        const blogdata = await prisma.blog.create({
            data: blogData,
            include:{
                user:true,
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