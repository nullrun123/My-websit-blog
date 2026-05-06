import Navbar from "@/components/Navbar";
import { getServerSession } from "@/lib/get-session";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <main className="flex flex-col min-h-screen justify-center ">
        <Navbar user={user}/>
        <div className="w-full h-screen"></div>
    </main>
  );
}
