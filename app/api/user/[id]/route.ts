import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



interface PropsId {
    id:string
}

export async function PUT(resquet:NextRequest,props:{params:PropsId}){
    
    try{
        const params = await props.params;
        const id = params.id;
        const body = await resquet.json();
        const { role } = body;
        console.log("newrole", body)

        // if(!role || role.trim() === ""){
        //     return NextResponse.json({
        //         success:false,
        //         error:"Failed to update user",
        //         status:400,
        //  })
        // }
        const newrole:any = {
            role,

        }
        const data = await prisma.user.update({
            where:{
                id
            },
            data:newrole,
        })

        // console.log("data",data)
        
        return NextResponse.json({
            success:true,
            data:data
        })


    }catch(error){
        console.error("Error PUT user : ",error);
        return NextResponse.json({
            success:false,
            error:"Failed to update user 101",
            status:500,
        })
    }
}