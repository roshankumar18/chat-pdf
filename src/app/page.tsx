"use client"
import FileUpload from "@/components/fileUpload";
import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const {isLoaded, isSignedIn} = useUser()
  return(
    <div className="min-h-screen w-screen bg-gradient-to-r from-sky-200 to-purple-300 flex flex-col items-center">
      <div className="py-9 flex flex-col items-center mb-3">
        <div className="flex items-center gap-3">
        <h2 className="font-semibold text-4xl text-center ">Chat with any PDF</h2> 
        <div><UserButton afterSignOutUrl="/"/></div>
        </div>

        <p className="text-center text-xl text-slate-500 max-w-xl">Join millions of students, researchers and professionals to 
          instantly answer questions and understand research with AI
        </p>
      </div>
      {isLoaded?
      (!isSignedIn?
      <SignInButton>
        <Button>Login</Button>
        </SignInButton>:
        <Button>Go to Chats</Button>):<>Loading...</>}


      {isSignedIn && <FileUpload/> }


    </div>
    
  )
}
