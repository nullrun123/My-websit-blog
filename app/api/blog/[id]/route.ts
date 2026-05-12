import prisma from "@/lib/prisma";
import { Param } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";



interface PropsId {
    id:string
}

export async function GET(resquet:NextRequest,props:{params:PropsId}){
    
    try{
        const params = await props.params;
        const id = params.id;

        const data = await prisma.blog.findFirst({
            where:{
                id
            },
        })
        
        return NextResponse.json({
            success:true,
            data:data
        })
    }catch(error){
        console.error("Error GET from id : ",error);
        return NextResponse.json({
            success:false,
            error:"Failed to find blog",
            status:500
        })
    }
}



export async function DELETE(resquet:NextRequest,props:{params:PropsId}){
    
    try{
        const params = await props.params;
        const id = params.id;

        await prisma.blog.delete({
            where:{
                id
            },
        })
        return NextResponse.json({
            success:true,
            messsage: "Delete the blog"
        })
    }catch(error){
        console.error("Error delete from id : ",error);
        return NextResponse.json({
            success:false,
            error:"Failed to delete blog",
            status:500
        })
    }
}


export async function PUT(resquet:NextRequest,props:{params:PropsId}){
    
    try{
        const params = await props.params;
        const id = params.id;
        const body = await resquet.json();

        const { text , title ,image} = body;

        if(!title || title.trim() === "" || !text || text.trim() === ""){
            return NextResponse.json({
                success:false,
                error:"Failed to update blog",
                status:400,
         })
        }

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
        
        const newdata:any = {
            text,
            title,

        }

        if (imageData) {
            newdata.image = imageData;
        }

        const data = await prisma.blog.update({
            where:{
                id
            },
            data:newdata,
        })
        
        return NextResponse.json({
            success:true,
            data:data
        })


    }catch(error){
        console.error("Error PUT blog : ",error);
        return NextResponse.json({
            success:false,
            error:"Failed to update blog",
            status:500,
        })
    }
}