"use client"
import React, { useState } from "react";
import { Github, Linkedin, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Navbar from "@/app/components/Navbar";


const editTemplate2 = () => {
    const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        let new_data = formatUserData(data)
        setform([new_data])
        reset()
        setSkills([])
        setlanguages([])
    }

    const [skills, setSkills] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [exper, setexper] = useState([""])
    const [educ, seteduc] = useState([""])
    const [form, setform] = useState([])
    const [awards, setawards] = useState([""])
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
                    aboutRole: userData[`about_role${i}`],
                    duration: userData[`exper_duartion${i}`]
                });

                // Remove individual experience fields from the main object
                delete formattedData[`company_name${i}`];
                delete formattedData[`role_name${i}`];
                delete formattedData[`about_role${i}`];
                delete formattedData[`exper_duartion${i}`];
            }

        }
        formattedData.awards = [];
        for (let i = 1; i <= 3; i++) {
            if (userData[`year${i}`]) {
                formattedData.awards.push({
                    year: userData[`year${i}`],
                    certificate_name: userData[`certificate_name${i}`],
                    organisation_name: userData[`organisation_name${i}`]
                });

                // Remove individual experience fields from the main object
                delete formattedData[`year${i}`];
                delete formattedData[`certificate_name${i}`];
                delete formattedData[`organisation_name${i}`];
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

    const addawards = () => {
        setawards([...awards, ""])
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
                        <textarea {...register("about_me", { required: true })} className="w-full p-2 border rounded mb-2"></textarea>

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
                                            <input {...register(`company_name${index + 1}`, { required: true })} type="text" placeholder="Company Name" className="border w-1/2 p-2 rounded-md" />
                                        </div>
                                        <input {...register(`role_name${index + 1}`, { required: true })} type="text" placeholder="Role Name" className="border p-2 rounded-md" />
                                        <input {...register(`about_role${index + 1}`, { required: true })} type="text" placeholder="About Role" className="border p-2 rounded-md" />
                                    </div>) : (
                                    disablebtn("experiencebtn")
                                )
                            ))}
                        </div>
                        <button onClick={addExper} id="experiencebtn" className=" mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Experience
                        </button>
                        <div className="awards">
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Awards/Certifications<span className="text-red-500">*</span></h2>
                            {/* it has to limit only two experience */}
                            {awards.map((award, index) => (
                                index < 3 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <input {...register(`year${index + 1}`, { required: true })} type="text" placeholder="Year" className="border  p-2 rounded-md" />
                                        <input {...register(`certificate_name${index + 1}`, { required: true })} type="text" placeholder="Certification Name Name" className="border  p-2 rounded-md" />
                                        <input {...register(`organisation_name${index + 1}`, { required: true })} type="text" placeholder="Organisation Name" className="border p-2 rounded-md" />
                                    </div>) : (
                                    disablebtn("certificationbtn")
                                )
                            ))}
                        </div>
                        <button onClick={addawards} id="certificationbtn" className=" mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Certifications
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
                <div className="flex h-fit md:scale-0.8 scale-[0.65] sm:scale-[0.8] 2xl:scale-0.8 lg:scale-[0.8]  my-2  lg:my-10  min-w-fit lg:w-1/2  justify-center overflow-hidden items-center ">
                    <div id="resume" className="w-[630px] my-auto bg-[#ffffff] text-[#333132] shadow-2xl  flex h-[900px]  ">
                        {/* Header Section */}
                        <div className="flex w-[630px] flex-1  overflow-hidden  absolute top-0 items-center  text-white p-6 rounded-t-lg h-[20%] ">
                            <div className="flex justify-start px-5 rounded-l-full items-center gap-4 bg-[#241d19] w-[97%] relative py-5 right-[-46px]">
                                <img
                                    src={preview ?? "/resume2img.png"}
                                    alt="Profile"
                                    className="w-24 scale-[1.7] h-24 rounded-full border-4 border-white object-cover"
                                />
                                <div className="ml-8">
                                    <h1 className="text-xl font-bold whitespace-nowrap">{form[0]?.name ?? "DONNA STROUPEF"}</h1>
                                    <p className="text-sm">{form[0]?.title ?? "Sales Representative"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-full  overflow-hidden flex flex-row gap-4 text-xs">
                            {/* Left Section */}
                            <div className="flex bg-[#dfd7d3] w-[64%] px-4 h-full flex-col pt-44 justify-evenly gap-10 pb-7 space-y-4">
                                {/* Contact */}
                                <div>
                                    <h2 className="text-2xl font-bold text-[#111827]">Contact</h2>
                                    <ul className="space-y-2 mt-2">
                                        <li> {form[0]?.email ?? "hello@reallygreatsite.com"}</li>
                                        <li> {form[0]?.ph_number ?? "+123-456-7890"}</li>
                                        <li className="flex gap-2"> <Linkedin size={16} /> {form[0]?.Linkedin ?? "Linkedin@user"}</li>
                                        <li className="flex gap-2"><Github size={16} />{form[0]?.Github ?? "Github@user"}</li>
                                    </ul>
                                </div>

                                {/* Education */}
                                <div>
                                    <h2 className="text-2xl font-bold   text-[#111827]">Education</h2>

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
                                        <div key={index} className="my-2 flex flex-col gap-1">
                                            <p><strong>{education.course}</strong> <br />{education.university}</p>
                                            <p>CGPA: <strong>{education.cgpa}</strong> | <strong>{education.duration}</strong></p>
                                        </div>))}
                                </div>

                                {/* Skills */}
                                <div>
                                    <h2 className="text-2xl font-bold   text-[#111827]">Skills</h2>
                                    <ul className=" flex gap-1 flex-wrap items-center  mt-1 space-y-1">
                                        {(form[0]?.skills?.length > 0 ? form[0]?.skills
                                            : ["Web Design", "Branding", "Graphic Design", "SEO", "Marketing"]).map((skill, index) => (
                                                <li key={index}>• {skill}</li>
                                            ))}

                                    </ul>
                                </div>

                                {/* Languages */}
                                <div>
                                    <h2 className="text-2xl font-bold   text-[#111827]">Language</h2>
                                    {(form[0]?.languages?.length > 0 ? form[0]?.languages
                                        : ["English", "French"]).map((language, index) => (
                                            <li key={index}>{language}</li>
                                        ))}

                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="bg-white  flex w-60% flex-col justify-evenly gap-10 pt-44 pb-7 space-y-4">
                                {/* About Me */}
                                <div>
                                    <h2 className="text-2xl font-bold   text-[#111827] border-b border-black pb-1">About Me</h2>
                                    <p className="mt-1 text-wrap">
                                        {form[0]?.about_me ?? "I am a Sales Representative who initializes and manages relationships with customers. I serve as their point of contact and lead from initial outreach through the final purchase."}
                                    </p>
                                </div>

                                {/* Work Experience */}
                                <div className="flex flex-col pr-8 gap-4">
                                    <h2 className="text-2xl font-bold   text-[#111827] border-b border-black pb-1">Work Experience</h2>
                                    {(form[0]?.experience?.length > 0 ? form[0]?.experience : [
                                        {
                                            aboutRole: "Create more than 100 graphic designs",
                                            company: "Iarana, Inc",
                                            duration: "2020-2023",
                                            role: "SENIOR GRAPHIC DESIGNER"
                                        },
                                        {
                                            aboutRole: "Led a team of designers",
                                            company: "DesignHub Ltd",
                                            duration: "2018-2020",
                                            role: "GRAPHIC DESIGN LEAD"
                                        }
                                        ,
                                        {
                                            aboutRole: " Offer consumer goods packages to corporate clients",
                                            company: "Arowwai Industries",
                                            duration: "2018-2020",
                                            role: "Consumer Goods Seller"
                                        }

                                    ]).map((experience, index) => (
                                        <div key={index} className="mt-2">
                                            <div className="flex justify-between">
                                                <span className="mr-3 text-sm font-bold  ">{experience.company}</span>
                                                <span className="font-semibold">{experience.duration}</span></div>
                                            <p className="italic">{experience.role}</p>
                                            <div className=" mt-1 space-y-1"> <strong>Done:</strong> {experience.aboutRole}
                                            </div>
                                        </div>))}

                                </div>

                                {/* References */}
                                <div className="pr-8">
                                    <h2 className="text-2xl font-bold   text-[#111827] border-b border-black pb-1">Awards/Certifications</h2>
                                    <ul className="list-disc list-inside text-[10px] text-gray-700">
                                        {(form[0]?.awards?.length > 0 ? form[0]?.awards : [
                                            {
                                                certificate_name: "Employee Excellence",
                                                organisation_name: "Marketing Solutions Agency",
                                                year: "2036"
                                            },
                                            {
                                                certificate_name: "Certificate of Completion, Marketing Strategy",
                                                organisation_name: "Marketing Experts Network",
                                                year: "2035"
                                            },
                                            {
                                                certificate_name: "Promising Writer Award",
                                                organisation_name: "Liberty State University Editorial Staff",
                                                year: "2034"
                                            }
                                        ]).map((award, index) => (
                                            <li key={index} className="flex flex-col mt-1">
                                                <div className="font-bold text-[12px] flex items-center justify-between">{award.certificate_name} <span>{award.year}</span> </div>
                                                <span>{award.organisation_name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
}

export default editTemplate2;
