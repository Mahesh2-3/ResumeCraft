"use client"
import { SubmitForm } from "../actions/SubmitForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function loginPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const onSubmit = async (data) => {
    let message = await SubmitForm(data, "register");
    let err = document.querySelector(".error");
    err.style.display = "block";
    err.textContent = message.message;

    err.style.color = message.success ? "green" : "red";
    setTimeout(() => {
      err.style.display = "none"
      if (message.success) {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/${data.username}`);
        reset()
      }
    }, 2000);
  }
  //write handle submit function
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }




  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
       <motion.span
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 font-extrabold"
  >
    ResumeCraft
  </motion.span>
      <div className="w-full max-w-md  p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} {...register("fullName")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} {...register("email")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="text" name="username" placeholder="Username" onChange={handleChange} {...register("username")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="text-red-500 text-sm mt-1">{message}</p>
            )}
          />


          <input type="password" name="password" placeholder="Password" {...register("password", { required: "This is required.", minLength: { value: 7, message: "Not Strong Enough" } })} onChange={handleChange} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>}
          />

          <input type="password" name="confirmPassword" placeholder="Confirm Password" {...register("confirmPassword", { required: "This is required.", minLength: { value: 7, message: "Not Strong Enough" } })} onChange={handleChange} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} {...register("phone")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="text" name="country" placeholder="Country" onChange={handleChange} {...register("country")} className="bg-transparent w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="current_user" value={"yes"}  {...register("current_user")} className="hidden" />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Register Now</button>
          <p className="hidden text-red-500 font-semibold text-xl mt-1 error"></p>

        </form>
        {/* create a forgot password link and already registered sign in */}
        <div className="text-center mt-4">
          <a href={`${process.env.NEXT_PUBLIC_HOST}/ChangePassword`} className="text-blue-500">Forgot Password?</a>
          <p className="mt-2">Already registered? <a href={`${process.env.NEXT_PUBLIC_HOST}/login`} className="text-blue-500">Sign In</a></p>
        </div>
      </div>
    </div>
  );
}
