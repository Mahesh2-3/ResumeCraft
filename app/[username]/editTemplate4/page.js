"use client"
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Navbar from "@/app/components/Navbar";


const Resume = () => {
    const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        let new_data = formatUserData(data)
        setform([new_data])
        setSkills([])
    }
    const [skills, setSkills] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [exper, setexper] = useState([""])
    const [educ, seteduc] = useState([""])
    const [form, setform] = useState([])
    const [preview, setpreview] = useState(null)


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
            if (userData[`company_name${i}`]) {
                formattedData.experience.push({
                    company: userData[`company_name${i}`],
                    role: userData[`role_name${i}`],
                    aboutRole1: userData[`about_role1${i}`],
                    aboutRole2: userData[`about_role2${i}`],
                    aboutRole3: userData[`about_role3${i}`],
                    duration: userData[`exper_duartion${i}`]
                });

                // Remove individual experience fields from the main object
                delete formattedData[`company_name${i}`];
                delete formattedData[`role_name${i}`];
                delete formattedData[`about_role1${i}`];
                delete formattedData[`about_role2${i}`];
                delete formattedData[`about_role3${i}`];
                delete formattedData[`exper_duartion${i}`];
            }
        }

        return formattedData;
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setpreview(URL.createObjectURL(file));
        }
    };

    const addExper = () => {
        setexper([...exper, ""]);
        console.log(exper)
    }


    const disablebtn = (btn_name) => {
        document.getElementById(`${btn_name}`).disabled = true
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

                        <label className="block text-sm font-medium text-white">Address<span className="text-red-500">*</span></label>
                        <textarea {...register("address", { required: true, })} className="w-full p-2 border rounded mb-2"></textarea>


                        <label className="block text-sm font-medium text-white">Email<span className="text-red-500">*</span></label>
                        <input {...register("email", { required: true, pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ " })} type="email" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Portfolio URL</label>
                        <input {...register("portfolio_url", { required: true })} type="url" className="w-full p-2 border rounded mb-2" />
                        <label className="block text-sm font-medium text-white">About Me</label>
                        <textarea className="w-full p-2 border rounded mb-2"></textarea>

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
                        <div className="experience">
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Experience<span className="text-red-500">*</span></h2>
                            {/* it has to limit only two experience */}
                            {exper.map((exp, index) => (
                                index < 2 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <div className="flex gap-3">
                                            <input {...register(`exper_duartion${index + 1}`, { required: true })} type="text" placeholder="Duration" className="border w-1/2 p-2 rounded-md" />
                                            <input {...register(`company_name${index + 1}`, { required: true })} type="text" placeholder="Company Name" className="border w-1/2 p-2 rounded-md" />
                                        </div>
                                        <input {...register(`role_name${index + 1}`, { required: true })} type="text" placeholder="Role Name" className="border p-2 rounded-md" />
                                        <input {...register(`about_role1${index + 1}`, { required: true })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                        <input {...register(`about_role2${index + 1}`, { required: true })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                        <input {...register(`about_role3${index + 1}`, { required: true })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                    </div>) : (
                                    disablebtn("experiencebtn")
                                )
                            ))}
                        </div>
                        <button onClick={addExper} id="experiencebtn" className=" mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Experience
                        </button>

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
                                    placeholder="Enter a language and press Enter"
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
                            <label className="block text-xl mt-5 mb-1 font-medium text-white">Certifications</label>
                            <input {...register("certificates")} placeholder="enter all Certifications seperated by comma ," type="text" className="w-full p-2 border rounded mb-2" /></div>
                        <div>
                            <label className="block text-xl mt-5 mb-1 font-medium text-white">Awards/Activities</label>
                            <input {...register("awards")} placeholder="enter all Awards Or Activities seperated by comma ," type="text" className="w-full p-2 border rounded mb-2" />
                        </div>
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
                <div className="scale-[0.65] sm:scale-[0.8] flex h-fit  my-2  lg:my-10  min-w-fit lg:w-1/2  justify-center items-center ">
                    <div className=" w-[630px] h-[900px] flex mx-auto flex-col justify-around shadow-lg border border-gray-300 my-auto px-4 py-6 font-sans bg-white text-black">
                        <div className="text-black px-3 flex flex-col items-start">
                            <h1 className="text-xl font-bold">{form[0]?.name ?? "DANIEL GALLEGO"}</h1>
                            <h2 className=" font-bold">{form[0]?.title ?? "UX DESIGNER"}</h2>
                            <p className="text-xs">{form[0]?.address ?? "123 Anywhere St., Any City"} | {form[0]?.email ?? "hello@reallygreatsite.com"} | {form[0]?.portfolio_url ?? "www.reallygreatsite.com"}</p>
                        </div>
                        <div>
                            <div className="mt-4 p-2">
                                <h3 className="border-gray-300 rounded-l-xl rounded-r-xl bg-gray-300 px-3 font-semibold mb-2 ">About Me</h3>
                                <p className="px-3 text-xs">
                                    {form[0]?.about_me ?? "UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction."}
                                </p>
                            </div>

                            <div className="mt-4 p-2">
                                <h3 className="border-gray-300 rounded-l-xl rounded-r-xl bg-gray-300 px-3 font-semibold mb-2 ">TECHNICAL SKILLS</h3>
                                <ul className="flex flex-wrap gap-2 px-3 font-semibold text-[12px]">
                                    {/* it has some deafult skills */}
                                    {(form[0]?.skills.length > 0 ? form[0]?.skills : [
                                        "python", "javascript", "react", "node.js", "html", "css", "git"
                                    ]).map((skill, index) => (
                                        <li key={index}>• {skill}</li>))}
                                </ul>
                            </div>

                            <div className="mt-4 p-2">
                                <h3 className="border-gray-300 rounded-l-xl rounded-r-xl bg-gray-300 px-3 font-semibold mb-2 ">PROFESSIONAL EXPERIENCE</h3>

                                {(form[0]?.experience?.length > 0 ? form[0]?.experience : [
                                    { company: "Instant Chartz App, Morcelle Program", duration: "Jan 2023 - Present", aboutRole1: "Led development of an advanced automation system, achieving a 15% increase in operational efficiency.", aboutRole2: "Streamlined manufacturing processes, reducing production costs by 10%.", aboutRole3: "Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime." },
                                    { company: "System UX Engineer, XarrowAI Industries", duration: "Feb 2021 - Dec 2022", aboutRole1: "Designed and optimized a robotic control system, realizing a 12% performance improvement.", aboutRole2: "Coordinated testing and validation, ensuring compliance with industry standards.", aboutRole3: "Provided technical expertise, contributing to a 15% reduction in system failures." }
                                ]).map((exp, index) => (
                                    <div key={index}>
                                        <p className="px-3  font-medium">{exp.company} <span className="float-right">{exp.duration}</span></p>
                                        <ul className="px-3 list-disc list-inside text-xs">
                                            <li>• {exp.aboutRole1}</li>
                                            <li>• {exp.aboutRole2}</li>
                                            <li>• {exp.aboutRole3}</li>
                                        </ul></div>))}

                            </div>

                            <div className="mt-4 p-2">
                                <h3 className="border-gray-300 rounded-l-xl rounded-r-xl bg-gray-300 px-3 font-semibold mb-2 ">EDUCATION</h3>
                                {(form[0]?.education?.length > 0 ? form[0]?.education : [
                                    { university: "University of Engineering UX Cohort", course: "UX Industrial Basics and General Application", duration: "Aug 2016 - Oct 2019" },
                                    { university: "Engineering University", course: "Bachelor of Design in Process Engineering", duration: "May 2014 - May 2016" }
                                ]).map((edu, index) => (
                                    <div key={index}>
                                        <p className="px-3  font-medium">{edu.course}<span className="float-right">{edu.duration}</span></p>
                                        <p className="px-3 text-xs">{edu.university}</p></div>))}
                                <p className="px-3  font-medium mt-2">Bachelor of Design in Process Engineering <span className="float-right">May 2014 - May 2016</span></p>
                                <p className="px-3 text-xs">Engineering University</p>
                            </div>

                            <div className="mt-4 p-2">
                                <h3 className="border-gray-300 rounded-l-xl rounded-r-xl bg-gray-300 px-3 font-semibold mb-2 ">ADDITIONAL INFORMATION</h3>
                                <p className="px-3 text-xs"><strong>Languages:</strong> English, French, Mandarin.</p>
                                <p className="px-3 text-xs"><strong>Certifications:</strong> Professional Design Engineer (PDE) License, Project Management Tech (PMT).</p>
                                <p className="px-3 text-xs"><strong>Awards/Activities:</strong> Most Innovative Employer of the Year (2021), Overall Best Employee Division Two (2024), Onboarding Project Lead (2023).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resume;