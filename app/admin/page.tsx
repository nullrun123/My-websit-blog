'use client'

import React, { useEffect, useState } from 'react'


interface UserProp {
  user:User
}
function page() {

  const [allUser, setAllUser] = useState<UserProp[] | []>([]);

  const getalluser = async()=>{

    try{  
      const res = await fetch('/api/user')
      const data = await res.json();
      setAllUser(data);
    }catch(error){
      console.log("error msg: ",error);
      
    }

  }

  useEffect(()=>{
    getalluser();
    
    console.log(allUser);
  },[allUser])

  return (
    <div>
      <ul>

     
     {/* {
      allUser.map((u)=>(
        <li></li>
      ))
     } */}
     </ul>
    </div>
  )
}

export default page
