"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/components/navcss.css"


export default function Navbar() {
    const router = useRouter();
    const [user, setuser] = useState()
    const [visibility, setvisibility] = useState(false)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`) // Call the API endpoint
            .then((res) => res.json())
            .then((data) => {
                setuser(data.user.username)
            })
    }, [])


    async function updateUserStatus(message) {
        let username = ""
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`, { // Replace with your actual API route
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, message }),
            });

            const data = await response.json();
            if (data.success) {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    function menu(boolean) {
        let a = document.getElementById("options")
        if (a.style.display != "none") {
            a.style.display = "none"
        } else {
            a.style.display = "flex"
        }
        if (boolean) {
            document.getElementById("checkbox").click()
        }
    }

    return (
        <nav className=" h-[9vh] flex items-center justify-center bg-[#071027] text-white md:p-4 px-4 shadow-lg">
            <div className=" h-full w-full flex justify-between items-center">
                {/* Logo or Brand Name */}
                <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 font-extrabold">ResumeCraft</h2>

                <div className="md:hidden block">
                    <label className="contai  w-fit mr-5">
                        <input type="checkbox" name="" id="checkbox" />
                        <div onClick={() => { menu(false) }} className="checkmark">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </label></div>
                {/* Navigation Links */}
                <div className="gap-4 mr-0 font-bold md:h-full bg-[#071027] px-5 py-5 h-fit  hidden  md:flex  justify-center items-center">
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/`}>Home</a></div>
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}#resumeTemplates`}>Templates</a></div>
                    <div className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/dashboard`}>Dashboard</a></div>
                    <button onClick={() => { updateUserStatus("no") }} className="nav-item">
                        Logout
                    </button>
                </div>
            </div>
            <div className="absolute z-10 top-[9vh] right-0 w-fit md:hidden" id="options" style={{ display: "none" }}>
                <div id="options" className="gap-4 mr-0 font-bold md:h-full bg-[#071027] px-5 py-5  w-[140px] h-fit flex flex-col  justify-center items-center">
                    <div onClick={() => { menu(true) }} className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/`}>Home</a></div>
                    <div onClick={() => { menu(true) }} className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}#resumeTemplates`}>Templates</a></div>
                    <div onClick={() => { menu(true) }} className="nav-item"><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/dashboard`}>Dashboard</a></div>
                    <button onClick={() => { updateUserStatus("no"); menu(true) }} className="nav-item">
                        Logout
                    </button>
                </div></div>
        </nav>
    );
}
