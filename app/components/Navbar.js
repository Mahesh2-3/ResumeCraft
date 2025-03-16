"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import Link from "next/link";
import "@/app/components/navcss.css"


export default function Navbar() {
    const router = useRouter();
    const [user, setuser] = useState()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`) // Call the API endpoint
        .then((res) => res.json())
        .then((data)=>{
          setuser(data.user.username)
        })
    }, [])
    

    async function updateUserStatus(message) {
        let username=""
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`, { // Replace with your actual API route
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,message }),
            });

            const data = await response.json();
            if (data.success) {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }


    return (
        <nav className=" h-[9vh] flex items-center justify-center bg-[#071027] text-white p-4 shadow-lg">
            <div className="container h-full mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="text-3xl font-bold">ResumeCraft</div>

                {/* Navigation Links */}
                <div className="space-x-6 h-full justify-center flex items-center">
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/`}>Home</a></div>
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}#resumeTemplates`}>Templates</a></div>
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/dashboard`}>Dashboard</a></div>
                    <button onClick={()=>{updateUserStatus("no")}} className="nav-item">
                      Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
