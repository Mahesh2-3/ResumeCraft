"use client"
import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaLock } from 'react-icons/fa'; // Using React Icons for creativity
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { motion } from "framer-motion";
import Footer from '@/app/components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/info`) // Call the API endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => setError("Error fetching user data"));
  }, []);

  if (error) return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">{error}</div>;
  if (!user) return (<div className="flex items-center flex-col gap-10 justify-center h-screen bg-black">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
    ></motion.div>
    <span className="text-3xl text-bold">Loading...</span>
  </div>
  );



  return (
    <>
      <motion.div
        animate={{ y: [-100, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Navbar /></motion.div>
      <div className="h-[82vh] flex items-center justify-center">
        <div className=" p-8 scale-90 md:scale-100 rounded-lg  w-full max-w-2xl text-center transform transition-all hover:shadow-[0_0_20px_4px_rgba(0,0,255,1)]">
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <h1 className="text-4xl font-bold mb-8">
              Your Dashboard
            </h1>
          </motion.div>
          {/* User Details */}
          <div className="space-y-6">
            {/* Name */}
            <motion.div
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 2 }}
            >
              <div className="p-6 rounded-lg  border-2 hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center justify-center space-x-4">
                  <FaUser className="text-2xl" style={{ color: '#2BC0E4' }} />
                  <div className='flex gap-3 w-[370px] justify-between  items-center'>
                    <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Name</p>
                    <p className="text-white text-sm">{user.fullName}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Username */}
            <motion.div
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 1.5 }}
            >
              <div className="p-6 rounded-lg  border-2 hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center justify-center space-x-4">
                  <FaUser className="text-2xl" style={{ color: '#2BC0E4' }} />
                  <div className='flex gap-3 w-[370px] justify-between  items-center'>
                    <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Username</p>
                    <p className="text-white text-sm">{user.username}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 1 }}
            >
              <div className="p-6 rounded-lg  border-2 hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center justify-center space-x-4">
                  <FaEnvelope className="text-2xl" style={{ color: '#2BC0E4' }} />
                  <div className='flex gap-3 w-[370px] justify-between  items-center'>
                    <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Email</p>
                    <p className="text-white text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            >
              <div className="p-6 rounded-lg  border-2 hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center justify-center space-x-4">
                  <FaPhone className="text-2xl" style={{ color: '#2BC0E4' }} />
                  <div className='flex gap-3 w-[370px] justify-between  items-center'>
                    <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Phone</p>
                    <p className="text-white text-sm">{user.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Country */}
            <motion.div
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <div className="p-6 rounded-lg  border-2 hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center justify-center space-x-4">
                  <FaGlobe className="text-2xl" style={{ color: '#2BC0E4' }} />
                  <div className='flex gap-3 w-[370px] justify-between  items-center'>
                    <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Country</p>
                    <p className="text-white text-sm">{user.country}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="p-6 rounded-lg border-2 cursor-pointer hover:bg-gray-800" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_HOST}/ChangePassword`}>
              <div className="flex items-center justify-center space-x-4">
                <motion.div
                  animate={{ opacity: [0, 1], scale: [10, 1] }}
                  transition={{ duration: 0.5, delay: 2.5, ease: "easeIn" }}
                >
                  <FaLock className="text-2xl" style={{ color: '#2BC0E4' }} />
                </motion.div>
                <p className="text-lg font-semibold" style={{ color: '#2BC0E4' }}>Change Password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [100, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
      <Footer /></motion.div>
    </>
  );
};

export default Dashboard;