import React from 'react'
import { Github, Linkedin, Mail, User, Phone, Settings, Languages, Contact2, Check, Plus, X } from "lucide-react";


const resume1 = () => {
    return (
        <>
            <div id="resume" className="w-[630px]  p-8  my-auto bg-[#ffffff] text-[#333132] shadow-2xl  flex h-[900px]">
                {/* Left Section */}
                <div className="w-[35%] h-full bg-[#333132] text-white flex flex-col rounded-t-full">
                    <div className="pt-6 mb-6">
                        <img
                            src="/profile3.jpg"
                            alt="Profile"
                            className="w-44 scale-[1.2] object-cover shadow-[0px_0px_0px_6px_white] mx-auto h-44 rounded-full border-4 border-black mb-4"
                        />
                    </div>
                    <div className="px-6">


                        <div className="mt-6 text-sm flex flex-col gap-2">
                            <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><User fill="white" />About Me</h2>
                            <p className="text-gray-400 text-justify text-xs leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet.
                            </p>
                        </div>

                        <div className="mt-6 text-sm flex flex-col gap-2">
                            <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Contact2 />Contact</h2>
                            <p className="flex items-center gap-2 text-gray-400"><Phone size={16} /> +123-456-7890</p>
                            <p className="flex items-center gap-2 text-gray-400"><Mail width={16} height={16} />hello@reall</p>
                            <p className="flex gap-2 text-gray-400"><Linkedin size={16} /> Linkedin@user</p>
                            <p className="flex gap-2 text-gray-400"><Github size={16} />Github@user</p>
                        </div>

                        <div className="mt-6 text-sm flex flex-col gap-2">
                            <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Settings />Skills</h2>
                            <ul className="text-gray-400 text-xs">
                                <li>• Web Design</li>
                                <li>• Branding</li>
                                <li>• Graphic Design</li>
                                <li>• SEO</li>
                                <li>• Marketing</li>
                            </ul>
                        </div>

                        <div className="mt-6 text-sm flex flex-col gap-2">
                            <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Languages />Language</h2>
                            <ul className="text-gray-400 text-xs">
                                <li>• English</li>
                                <li>• French</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-[65%] p-6 h-full text-black flex flex-col">
                    <div>
                        <h1 className="text-5xl  w-[80%] font-bold">Isabel Schumacher</h1>
                        <p className="">Graphics Designer</p>
                    </div>
                    <div className="flex flex-col h-[80%] gap-10 mt-16">
                        <div className="flex flex-col gap-5">
                            <h2 className=" text-2xl font-semibold">🎓 Education
                            </h2>
                            <div className=" flex h-[80px] items-center flex-row gap-4">
                                <div className="relative flex flex-col items-center h-[80%]">
                                    <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                    <div className="h-full w-[3px] bg-black"></div>
                                    <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                </div>
                                <div className="h-full flex flex-col justify-around">
                                    <p className="font-semibold">(2011-2015)</p>
                                    <p className="text-gray-700 font-bold">WARDIERE UNIVERSITY</p>
                                    <p className="text-sm text-gray-500">Bachelor of Design | 3.65</p></div>
                            </div>
                            <div className=" flex h-[80px] items-center flex-row gap-4">
                                <div className="relative flex flex-col items-center h-[80%]">
                                    <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                    <div className="h-full w-[3px] bg-black"></div>
                                    <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                </div>
                                <div className="h-full flex flex-col justify-around">
                                    <p className="font-semibold">(2011-2015)</p>
                                    <p className="text-gray-700 font-bold">WARDIERE UNIVERSITY</p>
                                    <p className="text-sm text-gray-500">Bachelor of Design | 3.65</p></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h2 className=" text-2xl font-semibold">💼 Experience
                            </h2>
                            <div className=" flex h-[120px] items-center flex-row gap-4">
                                <div className="relative flex flex-col items-center h-[90%]">
                                    <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                    <div className="h-full w-[3px] bg-black"></div>
                                    <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                </div>
                                <div className="h-full flex flex-col justify-around">
                                    <p className="font-semibold">(2020-2023)</p>
                                    <p className="text-gray-700 font-bold">SENIOR GRAPHIC DESIGNER</p>
                                    <p className="text-sm text-gray-500">Fauget Studio</p>
                                    <ul className="text-sm text-gray-500 list-disc pl-4">
                                        <li>Create more than 100 graphic designs</li>
                                        <li>Complete a lot of complicated work</li>
                                    </ul></div>
                            </div>
                            <div className=" flex h-[120px] items-center flex-row gap-4">
                                <div className="relative flex flex-col items-center h-[90%]">
                                    <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                    <div className="h-full w-[3px] bg-black"></div>
                                    <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                </div>
                                <div className="h-full flex flex-col justify-around">
                                    <p className="font-semibold">(2017-2019)</p>
                                    <p className="text-gray-700 font-bold">SENIOR GRAPHIC DESIGNER</p>
                                    <p className="text-sm text-gray-500">Iarana, Inc</p>
                                    <ul className="text-sm text-gray-500 list-disc pl-4">
                                        <li>Create more than 100 graphic designs for big companies</li>
                                        <li>Complete a lot of complicated work</li>
                                    </ul></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default resume1