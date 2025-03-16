"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { SubmitForm } from '../actions/SubmitForm';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    let message = await SubmitForm(data, "login");
    let err = document.querySelector(".error");
    err.style.display = "block";
    err.textContent = message.message;
    err.style.color = message.success ? "green" : "red";
    setTimeout(() => err.style.display = "none", 3000);
    if (message.success) {
      fetch("/api/info") // Call the API endpoint
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            router.push(`/${data.user.username}`)
          }
        })
        .catch((err) => setError("Error fetching user data"));
      reset()
    }

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex  text-white items-center justify-center min-h-screen">
      <div className="w-[60vw]  flex flex-col justify-center items-center  p-6 rounded-lg shadow-lg">

      <h2 className="text-5xl w-fit font-semibold text-center mb-8 ">
  Welcome Back to{" "}
  <motion.span
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 font-extrabold"
  >
    ResumeCraft
  </motion.span>
</h2>


        <h2 className="text-3xl w-[30vw] font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  mb-3">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} {...register("username")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="password" name="password" placeholder="Password" {...register("password", { required: "This is required." })} onChange={handleChange} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition">login</button>
          <p className="hidden text-red-500 font-semibold text-xl mt-1 error"></p>

        </form>
        <div className='flex gap-20 justify-between items-center'>
          <div className='inline text-center my-2'>New to ResumeCraft  <a className="text-green-500 hover:underline underline-offset-4" href="/register">Register Now</a> </div>
          <a className="text-blue-500 inline text-center my-2 hover:underline underline-offset-4 " href="/ChangePassword">forgot Password</a>
        </div>
      </div>
    </div>
  )
}

export default login