"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useState } from 'react';
import { SubmitForm } from '../actions/SubmitForm';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const onSubmit = async (data) => { 
    let message = await SubmitForm(data,"ChangePassword");
    let err = document.querySelector(".error");
    err.style.display = "block";
    err.textContent = message.message;
    err.style.color = message.success ? "green" : "red";
    setTimeout(() => err.style.display = "none", 3000);
    if (message.success){
      router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
      reset()
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} {...register("email")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="text" name="username" placeholder="Username" onChange={handleChange} {...register("username")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} {...register("phone")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="text-red-500 text-sm mt-1">{message}</p>
            )}
          />

          <input type="password" name="password" placeholder="New Password" {...register("password", { required: "This is required.", minLength: { value: 7, message: "Not Strong Enough" } })} onChange={handleChange} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Change Password And login</button>
          <p className="hidden text-red-500 font-semibold text-xl mt-1 error"></p>

        </form>
      </div>
    </div>
  )
}

export default ChangePassword