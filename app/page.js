"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


const YourComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push(`/${data.user.username}`);
        } else {
          router.push("/login");
        }
      })
      .finally(() => setLoading(false)); // Stop loading after request
  }, [router]);

  if (loading) {
    return (
      <>
    <div className="flex items-center flex-col gap-10 justify-center h-screen bg-black">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
      ></motion.div>
      <span className="text-3xl text-bold">Loading...</span>
    </div>
      </>
    );
  }

  return null;
};

export default YourComponent;
