"use client"
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer";


export default function LinkShortener() {
  const [user, setuser] = useState()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`) // Call the API endpoint
        .then((res) => res.json())
        .then((data) => {
          setuser(data.user.username)
        })
    }
    fetchData()
   
  }, [])


  function AnimatedSection({ children, duration = 1, y, x }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: x, y: y }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: x, y: y }}
        transition={{ duration: duration, ease: "easeOut" }}
        className="inline-block text-center"
      >
        {children}
      </motion.div>
    );
  }

  




  return (
    <><div className="relative">
      <motion.div
        animate={{ y: [-100, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Navbar /></motion.div>
      <div>
        <div className="flex items-center justify-center flex-col h-[92vh] w-[90vw] md:w-[65vw] lg:w-[50vw] mx-auto">
          <span className="my-10 text-3xl md:text-5xl font-bold">Welcome to <span className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 font-extrabold">ResumeCraft</span> Your Ultimate Resume Builder
            <motion.span
              animate={{ rotate: [180, 360], x: [-300, 0], y: [0, 300, 0], opacity: [0, 1], scale: [1.5, 1] }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="inline-block text-5xl md:text-7xl font-bold"
            >🚀</motion.span>
          </span>
          <motion.div
            animate={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <span className="text-base md:text-xl text-[#bababa] font-bold">Create a professional resume in minutes! Our resume builder provides customizable templates where you can enter your details and generate your own perfect resume—all for free.</span></motion.div>
        </div>
        <div id="resumeTemplates">
          <AnimatedSection duration={1.5} y={-75} x={0}>
            <div className=" text-3xl md:text-5xl w-[100vw]  mt-16 font-bold ">Choose A Template</div>
          </AnimatedSection>
          <div className="flex flex-wrap w-[80%] gap-y-9 mx-auto justify-evenly items-center">
            <AnimatedSection duration={1} y={0} x={-60} >
              <div><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/editTemplate1`}><img className="scale-90 cursor-pointer" src="resume1.png" alt="" /></a></div></AnimatedSection>
            <AnimatedSection duration={1} y={0} x={60}><div><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/editTemplate2`}><img className="scale-90 cursor-pointer" src="resume2.png" alt="" /></a></div></AnimatedSection>
            <AnimatedSection duration={1} y={0} x={-60}><div><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/editTemplate3`}><img className="scale-90 cursor-pointer" src="resume3.png" alt="" /></a></div></AnimatedSection>
            <AnimatedSection duration={1} y={0} x={60}><div><a href={`${process.env.NEXT_PUBLIC_HOST}/${user}/editTemplate4`}><img className="scale-90 cursor-pointer" src="resume4.png" alt="" /></a></div></AnimatedSection>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
}