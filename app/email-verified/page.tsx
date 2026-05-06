
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'


export const metadata:Metadata={
    title: "email verified"
}

async function EmailVerified() {
//     const session = await getServerSession();
//     const user = session?.user;

//   console.log(user)
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className='text-green-500'>Email verified Completed!</CardTitle>
        {/* <CardDescription>
          This card uses the small size variant.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>
          go back to Your Blog
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Link href={'/blog'}>Go to Blog</Link>
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default EmailVerified

