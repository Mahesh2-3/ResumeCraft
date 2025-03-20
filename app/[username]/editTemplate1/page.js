"use client"
import React, { useState, useRef } from "react";
import { Github, Linkedin, Mail, User, Phone, Settings, Languages, Contact2, Check, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Navbar from "@/app/components/Navbar";

const editTemplate1 = () => {
    const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        let new_data = formatUserData(data)
        setSkills([])
        setlanguages([])
        setform([new_data])
        reset()
    }
    const resumeRef = useRef(); // Reference for the resume div
    const [skills, setSkills] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [preview, setpreview] = useState(null)
    const [exper, setexper] = useState([""])
    const [educ, seteduc] = useState([""])
    const [form, setform] = useState([])





    const addSkill = (skill) => {
        if (skill.trim() !== "") {
            const updatedSkills = [...skills, skill];
            setSkills(updatedSkills);
            setValue("skills", updatedSkills);
        }
    };
    const addLanguage = (language) => {
        if (language.trim() !== "") {
            const updatedlanguage = [...languages, language];
            setlanguages(updatedlanguage);
            setValue("languages", updatedlanguage);
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setpreview(URL.createObjectURL(file));
        }
    };

    function formatUserData(userData) {
        const formattedData = { ...userData };

        // Extract education details dynamically
        formattedData.education = [];
        for (let i = 1; i <= 2; i++) {
            if (userData[`university_name${i}`]) {
                formattedData.education.push({
                    university: userData[`university_name${i}`],
                    course: userData[`course_name${i}`],
                    cgpa: userData[`cgpa${i}`],
                    duration: userData[`educ_duartion${i}`]
                });

                // Remove individual education fields from the main object
                delete formattedData[`university_name${i}`];
                delete formattedData[`course_name${i}`];
                delete formattedData[`cgpa${i}`];
                delete formattedData[`educ_duartion${i}`];
            }
        }

        // Extract experience details dynamically
        formattedData.experience = [];
        for (let i = 1; i <= 2; i++) {
            if (userData[`comapany_name${i}`]) {
                formattedData.experience.push({
                    company: userData[`comapany_name${i}`],
                    role: userData[`role_name${i}`],
                    aboutRole1: userData[`about_role1${i}`],
                    aboutRole2: userData[`about_role2${i}`],
                    duration: userData[`exper_duartion${i}`]
                });

                // Remove individual experience fields from the main object
                delete formattedData[`comapany_name${i}`];
                delete formattedData[`role_name${i}`];
                delete formattedData[`about_role1${i}`];
                delete formattedData[`about_role2${i}`];
                delete formattedData[`exper_duartion${i}`];
            }
        }

        return formattedData;
    }

    const addExper = () => {
        setexper([...exper, ""]);
    }


    const disablebtn = (btn_name) => {
        document.getElementById(`${btn_name}`).disabled = true
        document.getElementById(`${btn_name}`).style.cursor = "not-allowed"
    }

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const addeduc = () => {
        seteduc([...educ, ""])
    }

    const removeLanguage = (index) => {
        setlanguages(languages.filter((_, i) => i !== index));
    };

    console.log(form)
    return (
        <>
            <Navbar />
            <div className=" lg:h-[90vh] h-fit w-full  flex flex-col-reverse lg:flex-row justify-evenly items-center ">

                <div className="inline w-full lg:w-1/2 h-full overflow-y-auto text-black  scrollbar-hide">

                    <h2 className="w-[80%] mx-auto text-3xl font-semibold mb-4 text-white">Edit Resume</h2>
                    <form className="w-[80%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <label className="block text-sm font-medium text-white">Name<span className="text-red-500">*</span></label>
                        <input type="text" {...register("name", { required: true, pattern: "/^[A-Za-z]+$/i" })} className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Title<span className="text-red-500">*</span></label>
                        <input {...register("title", { required: true })} type="text" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">About Me<span className="text-red-500">*</span></label>
                        <textarea  {...register("about_me", { required: true, })} className="w-full p-2 border rounded mb-2"></textarea>

                        <label className="block text-sm font-medium text-white">Phone<span className="text-red-500">*</span></label>
                        <input {...register("ph_number", { maxLength: 10, pattern: "/^[0-9]+$/", required: true })} type="text" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Email<span className="text-red-500">*</span></label>
                        <input {...register("email", { required: true, pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ " })} type="email" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Social Accounts<span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <input {...register("Github", { required: true })} placeholder="Github User Name" type="text" className="w-full p-2 border rounded mb-2" />
                            <input {...register("Linkedin")} placeholder="LinkedIn User Name" type="text" className="w-full p-2 border rounded mb-2" />
                        </div>
                        <div className="text-black">
                            <h2 className="text-2xl text-white font-semibold mt-2 mb-2 ">Skills<span className="text-red-500">*</span></h2>
                            <div className="flex flex-col gap-3">
                                <input type="hidden" {...register("skills")} value={skills} />
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <div key={index} className=" inline  gap-2 bg-gray-200 w-fit py-2 px-4 rounded-full">
                                            <span className="text-gray-700 font-bold ">{skill}</span>
                                            <X
                                                className="text-red-500 inline cursor-pointer"
                                                size={18}
                                                onClick={() => removeSkill(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter a skill and Press Enter"
                                    className="flex-1 outline-none w-full p-2 border rounded mb-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />

                            </div>
                        </div>
                        <div className="text-black">
                            <h2 className="text-2xl text-white font-semibold mt-2 ">Languages</h2>
                            <div className="flex flex-col gap-3">
                                <input type="hidden" {...register("languages")} value={languages} />
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((language, index) => (
                                        <div key={index} className="flex items-center gap-2 mt-2 bg-gray-200 px-4 py-2 rounded-md">
                                            <span className="text-gray-700">{language}</span>
                                            <X
                                                className="text-red-500 cursor-pointer"
                                                size={18}
                                                onClick={() => removeLanguage(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter a language"
                                    className="flex-1 outline-none w-full p-2 border rounded mb-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addLanguage(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Education<span className="text-red-500">*</span></h2>
                            {educ.map((edu, index) => (
                                index < 2 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <input {...register(`university_name${index + 1}`, { register: true })} type="text" placeholder="University Name" className="border p-2 rounded-md" />
                                        <input {...register(`course_name${index + 1}`, { register: true })} type="text" placeholder="Course Name" className="border p-2 rounded-md" />
                                        <div className="flex gap-3">
                                            <input {...register(`cgpa${index + 1}`, { pattern: "/^([0-9]*[.])?[0-9]+$/", register: true })} type="text" placeholder="CGPA" className="border p-2 w-1/2 rounded-md" />
                                            <input {...register(`educ_duartion${index + 1}`, { register: true })} type="text" placeholder="Duration" className="border p-2 w-1/2 rounded-md" />
                                        </div>
                                    </div>) : (
                                    disablebtn("educationbtn")
                                )
                            ))}
                        </div>
                        <button onClick={addeduc} id="educationbtn" className=" mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Education
                        </button>
                        <div className="experience">
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Experience<span className="text-red-500">*</span></h2>
                            {/* it has to limit only two experience */}
                            {exper.map((exp, index) => (
                                index < 2 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <div className="flex gap-3">
                                            <input {...register(`exper_duartion${index + 1}`, { required: true })} type="text" placeholder="Duration" className="border w-1/2 p-2 rounded-md" />
                                            <input {...register(`comapany_name${index + 1}`, { required: true })} type="text" placeholder="Company Name" className="border w-1/2 p-2 rounded-md" />
                                        </div>
                                        <input {...register(`role_name${index + 1}`, { required: true })} type="text" placeholder="Role Name" className="border p-2 rounded-md" />
                                        <span className="text-white"><strong>Note: </strong>write not more than 92 characters each</span>
                                        <input {...register(`about_role1${index + 1}`, { required: true, maxLength: 92 })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                        <input {...register(`about_role2${index + 1}`, { required: true, maxLength: 92 })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                    </div>) : (
                                    disablebtn("experiencebtn")
                                )
                            ))}
                        </div>
                        <button onClick={addExper} id="experiencebtn" className=" my-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Experience
                        </button>
                        <div className="flex justify-around items-center gap-5">
                            <label htmlFor="file" className="flex flex-col items-center justify-center gap-5 cursor-pointer h-[200px] mx-auto my-6 w-[300px] p-6 bg-[#212121] border-2 border-dashed border-[#e8e8e8] rounded-[10px] shadow-[0px_48px_35px_-48px_#e8e8e8]">
                                <div className="flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 fill-[#e8e8e8]">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"></path>
                                    </svg>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="font-normal text-[#e8e8e8]">Click to upload image <span className="font-normal text-red-600">*</span></span>
                                </div>
                                <input id="file" {...register("image", { required: true })} type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                            </label>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Uploaded Preview"
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                            )}
                        </div>
                        <button className="w-full bg-green-500 text-white my-6 rounded-md py-3 " type="submit">Submit</button>
                    </form>
                </div>

                <div className="flex h-fit md:scale-0.8 scale-[0.65] sm:scale-[0.8] 2xl:scale-0.8 lg:scale-[0.8] my-2  lg:my-10  min-w-fit lg:w-1/2  justify-center items-center ">
                    <div id="resume" className="w-[630px]   mx-auto p-8  my-auto bg-[#ffffff] text-[#333132] shadow-2xl  flex h-[900px]">
                        {/* Left Section */}
                        <div className="w-[35%] h-full bg-[#333132] text-white flex flex-col rounded-t-full">
                            <div className="pt-6 mb-6">
                                <img
                                    src={preview ?? "/resume1img.png"}
                                    alt="Profile"
                                    className="w-44 scale-[1.2] object-cover shadow-[0px_0px_0px_6px_white] mx-auto h-44 rounded-full border-[#333132] border-4 mb-4"

                                />
                            </div>
                            <div className="px-3">


                                <div className="mt-6 text-sm flex flex-col gap-2">
                                    <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><User fill="white" />About Me</h2>
                                    <p className="about_me text-gray-400 text-justify text-xs leading-relaxed">
                                        {form[0]?.about_me ?? " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet."}
                                    </p>
                                </div>

                                <div className="mt-6 text-sm flex flex-col gap-2">
                                    <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Contact2 />Contact</h2>
                                    <p className="Phone_number flex items-center gap-2 text-gray-400"><Phone size={16} />{form[0]?.ph_number ?? "+123-456-7890"}</p>
                                    <p className="email   flex items-center gap-2 text-gray-400"><Mail width={16} height={16} /><span className="overflow-hidden whitespace-nowrap  text-ellipsis text-[12px]">{form[0]?.email ?? "karnamaheshbabu32@gmail.com"}</span></p>
                                    <p className="linkedin flex gap-2 text-gray-400"><Linkedin size={16} /> {form[0]?.Linkedin ?? "Linkedin@user"}</p>
                                    <p className="github flex gap-2 text-gray-400"><Github size={16} />{form[0]?.Github ?? "Github@user"}</p>
                                </div>

                                <div className="mt-6 text-sm flex flex-col gap-2">
                                    <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Settings />Skills</h2>
                                    <ul className="flex flex-wrap gap-1 skills text-gray-400 text-xs">
                                        {(form[0]?.skills?.length > 0 ? form[0]?.skills : ["Web Design", "Branding", "Graphic Design", "SEO", "Marketing"]).map((skill, index) => (
                                            <li key={index}>• {skill}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-6 text-sm flex flex-col gap-2">
                                    <h2 className="text-lg flex gap-2 font-semibold border-b border-gray-700 pb-1 mb-2"><Languages />Language</h2>
                                    <ul className="languages flex flex-wrap gap-1 text-gray-400 text-xs">

                                        {(form[0]?.languages?.length > 0 ? form[0]?.languages : ["English", "French"]).map((language, index) => (
                                            <li key={index}>• {language}</li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-[65%] p-6 h-full text-black flex flex-col">
                            <div>
                                <h1 className="name text-5xl  w-[80%] font-bold">{form[0]?.name ?? "Isabel Schumacher"}</h1>
                                <p className="title">{form[0]?.title ?? "Graphics Designer"}</p>
                            </div>

                            <div className="flex justify-around flex-col h-[80%] gap-10 mt-16">
                                <div className="flex flex-col gap-5">
                                    <h2 className=" text-2xl font-semibold">💼 Experience
                                    </h2>
                                    {(form[0]?.experience?.length > 0 ? form[0]?.experience : [
                                        {
                                            aboutRole1: "Managed a team of 5 designers",
                                            aboutRole2: "Complete a lot of complicated work ",
                                            company: "Iarana, Inc",
                                            duration: "2020-2023",
                                            role: "SENIOR GRAPHIC DESIGNER"
                                        },
                                        {
                                            aboutRole1: "Led a team of designers",
                                            aboutRole2: "Collaborated with marketing",
                                            company: "DesignHub Ltd",
                                            duration: "2018-2020",
                                            role: "GRAPHIC DESIGN LEAD"
                                        }

                                    ]).map((experience, index) => (
                                        <div key={index} className="flex h-fit items-center flex-row gap-4">
                                            <div className="relative flex flex-col items-center h-[90%]">
                                                <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                                <div className="h-full w-[3px] bg-black"></div>
                                                <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                            </div>
                                            <div className="h-full flex flex-col  gap-2">
                                                <p className="role text-sm text-gray-700 font-bold">{experience.role} | {experience.duration}</p>
                                                <p className="company_name text-sm text-gray-500">{experience.company}</p>
                                                <ul className="done text-sm w-[full] break-all whitespace-normal text-gray-500 list-disc pl-4">
                                                    <li>{experience.aboutRole1}</li>
                                                    <li>{experience.aboutRole2}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <div className="flex flex-col gap-5">
                                    <h2 className=" text-2xl font-semibold">🎓 Education
                                    </h2>
                                    {(form[0]?.education?.length > 0 ? form[0]?.education : [
                                        {
                                            cgpa: "3.80",
                                            course: "Master of Arts in Visual Design",
                                            duration: "2016-2018",
                                            university: "CREATIVE ARTS INSTITUTE"
                                        },
                                        {
                                            cgpa: "3.65",
                                            course: "Bachelor of Design",
                                            duration: " 2011-2015",
                                            university: "WARDIERE UNIVERSITY"
                                        }
                                    ]).map((education, index) => (
                                        <div key={index} className=" flex h-[80px] items-center flex-row gap-4">
                                            <div className="relative flex flex-col items-center h-[80%]">
                                                <div className="w-3 h-3 bg-black rounded-full absolute top-0"></div>
                                                <div className="h-full w-[3px] bg-black"></div>
                                                <div className="w-3 h-3 bg-black rounded-full absolute bottom-0"></div>
                                            </div>
                                            <div className="h-full flex flex-col justify-around">
                                                <p className="education_duration font-semibold">{education.duration}</p>
                                                <p className="university text-gray-700 font-bold">{education.university}</p>
                                                <p className="course text-sm text-gray-500">{education.course} | <span className="cgpa">{education.cgpa}</span></p></div>
                                        </div>
                                    ))}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
export default editTemplate1;
