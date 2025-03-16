"use client"
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Navbar from "@/app/components/Navbar";

const Resume = () => {
    const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("submitted")
        let new_data = formatUserData(data)
        setform([new_data])
        reset()
        setSkills([])
    }

    const [skills, setSkills] = useState([]);
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
        formattedData.awards = [];
        for (let i = 1; i <= 2; i++) {
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

    const addExper = () => {
        setexper([...exper, ""]);
        console.log(exper)
    }

    const addawards = () => {
        setawards([...awards, ""])
    }


    const disablebtn = (btn_name) => {
        document.getElementById(`${btn_name}`).disabled = true
        document.getElementById(`${btn_name}`).style.cursor="not-allowed"
    }

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const addeduc = () => {
        seteduc([...educ, ""])
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setpreview(URL.createObjectURL(file));
        }
    };


    return (
        <>

            <Navbar />
            <div className=" h-[90vh]  flex justify-around items-center overflow-hidden">
                {/* make scroll bar width zero */}

                <div className="inline w-1/3 h-full overflow-y-auto text-black  p-6 scrollbar-hide">

                    <h2 className="text-3xl font-semibold mb-4 text-white">Edit Resume</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="block text-sm font-medium text-white">Name<span className="text-red-500">*</span></label>
                        <input type="text" {...register("name", { required: true })} className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Title<span className="text-red-500">*</span></label>
                        <input {...register("title", { required: true })} type="text" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Phone<span className="text-red-500">*</span></label>
                        <input {...register("ph_number", { maxLength: 10, required: true })} type="text" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Email<span className="text-red-500">*</span></label>
                        <input {...register("email", { required: true })} type="email" className="w-full p-2 border rounded mb-2" />

                        <label className="block text-sm font-medium text-white">Address<span className="text-red-500">*</span></label>
                        <textarea {...register("address", { required: true, })} className="w-full p-2 border rounded mb-2"></textarea>
                        <label className="block text-sm font-medium text-white">Linkedin </label>
                        <input {...register("Linkedin")} placeholder="LinkedIn User Name" type="text" className="w-full p-2 border rounded mb-2" />
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
                        <div className="awards">
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Awards/Certifications<span className="text-red-500">*</span></h2>
                            {/* it has to limit only two experience */}
                            {awards.map((award, index) => (
                                index < 3 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <input {...register(`year${index + 1}`, { required: true })} type="text" placeholder="Year" className="border  p-2 rounded-md" />
                                        <input {...register(`certificate_name${index + 1}`, { required: true })} type="text" placeholder="Certification Name" className="border  p-2 rounded-md" />
                                        <input {...register(`organisation_name${index + 1}`, { required: true })} type="text" placeholder="Organisation Name" className="border p-2 rounded-md" />
                                    </div>) : (
                                    disablebtn("certificationbtn")
                                )
                            ))}
                        </div>
                        <button onClick={addawards} id="certificationbtn" className=" mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Plus size={18} /> Add Certifications
                        </button>
                        <div>
                            <h2 className="text-2xl text-white font-semibold mt-6 mb-4">Education<span className="text-red-500">*</span></h2>
                            {educ.map((edu, index) => (
                                index < 2 ? (
                                    <div key={index} className="flex flex-col gap-3 mb-5">
                                        <input {...register(`university_name${index + 1}`, { register: true })} type="text" placeholder="University Name" className="border p-2 rounded-md" />
                                        <input {...register(`course_name${index + 1}`, { register: true })} type="text" placeholder="Course Name" className="border p-2 rounded-md" />
                                        <div className="flex gap-3">
                                            <input {...register(`cgpa${index + 1}`, { register: true })} type="text" placeholder="CGPA" className="border p-2 w-1/2 rounded-md" />
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
                <div className="w-[630px] h-[900px] scale-95 text-xs bg-white text-black border-gray-300 my-auto  font-sans">
                    <div className="h-[20%] p-6 bg-[#4b4b4b] ">
                        <div className=" w-fit p-6 text-white flex items-center ">
                            <img
                                src={preview ?? "/resume3img.png"}
                                alt="Profile"
                                className="w-36 h-36 top-6 relative mr-4 object-cover"
                            />
                            <div>
                                <h1 className="text-3xl font-serif tracking-wide font-bold">{form[0]?.name ?? "STEFANO ACCORSI"}</h1>
                                <h2 className="text-base font-serif">{form[0]?.title ?? "CONTENT STRATEGIST"}</h2>
                            </div>
                        </div>
                    </div>
                    <div className=" h-[80%] bg-[#ffffff]  p-8 flex flex-col justify-around">
                        <div className="flex justify-between gap-3 items-center">
                            <div className="mt-4 flex justify-start h-full gap-3 flex-col items-start w-[60%]">
                                <h3 className="text-black font-bold text-lg">Skills</h3>
                                <div className="text-[14px] w-full flex flex-wrap  gap-1 text-gray-700">
                                    {(form[0]?.skillslength > 0 ? form[0].skill : [
                                        "Python", "C", "JavaScript", "React", "Node.js", "HTML", "CSS", "SQL", "MongoDB", "Firebase"
                                    ]).map((skill, index) => (
                                        <div key={index}>• {skill}</div>))}

                                </div>
                            </div>

                            <div className="mt-4 space-y-1 w-[40%]  text-black">
                                <h3 className="text-black font-bold text-sm">CONTACT</h3>
                                <p className="text-[10px]"><strong className="text-xs">Phone:</strong> {form[0]?.ph_number ?? "+123-456-7890"}</p>
                                <p className="text-[10px]"><strong className="text-xs">Email:</strong> {form[0]?.email ?? "hello@reallygreatsite.com"}</p>
                                <p className="text-[10px]"><strong className="text-xs">Address:</strong> {form[0]?.address ?? "123 Anywhere St., Any City, ST 12345"}</p>
                                <p className="text-[10px]"><strong className="text-xs">LinkedIn:</strong> {form[0]?.Linkedin ?? "@LinkedinUser"}</p>
                            </div>
                        </div>
                        <div className="w-full h-[2px] bg-black"></div>

                        <div className="mt-4">
                            <h3 className="text-black font-bold text-sm">WORK EXPERIENCE</h3>
                            {(form[0]?.length > 0 ? form[0].experience :
                                [
                                    {
                                        aboutRole1: "Created and executed ",
                                        aboutRole2: "Increased lead generation by 25% within a year",
                                        aboutRole3: "Created and executed ",
                                        company: "Content Strategist",
                                        duration: " 2020-2023",
                                        role: "SENIOR GRAPHIC DESIGNER"
                                    },
                                    {
                                        aboutRole1: "Performed market research and data analysis, increasing customer retention rates by 15%",
                                        aboutRole2: "Contributed to a 30% increase in lead generation through well-developed and executed marketing campaigns",
                                        aboutRole3: "Developed a digital marketing campaign for a new product, increasing conversion rates by 5%",
                                        company: "Marketing Solutions Agency",
                                        duration: " 2035-2037",
                                        role: "Marketing Specialist"
                                    }
                                ]
                            ).map((exp, index) => (
                                <div key={index} className="mt-2">
                                    <h4 className="font-semibold">{exp.role} | <span> {exp.duration}</span></h4>
                                    <p className="text-xs font-semibold mt-1">{exp.company}</p>
                                    <ul className="list-disc list-inside text-[10px] text-gray-700">
                                        <li>{exp.aboutRole1}</li>
                                        <li>{exp.aboutRole2}</li>
                                        <li>{exp.aboutRole3}</li>
                                    </ul>
                                </div>))}
                        </div>
                        <div className="w-full h-[2px] bg-black"></div>

                        <div className="mt-4 flex gap-7">
                            <div className="w-1/2">
                                <h3 className="text-black font-bold text-sm">AWARDS AND CERTIFICATION</h3>
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
                                        },
                                        {
                                            certificate_name: "Certificate of Completion, Writing for Marketing",
                                            organisation_name: "Liberty State University",
                                            year: "2034"
                                        }
                                    ]).map((award, index) => (
                                        <li key={index} className="font-bold flex flex-col gap-1">
                                            <div className=" flex gap-2">• {award.certificate_name}<span className=" text-[10px] font-normal">'{award.year}'</span></div>
                                            <div className="font-normal">      {award.organisation_name}</div></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3w-1/2">
                                <h3 className="text-black font-bold text-sm">ACADEMIC HISTORY</h3>
                                {(form[0]?.education?.length > 0 ? form[0]?.education : [
                                    {
                                        course: "Bachelor of Arts in Marketing Communication",
                                        cgpa: "3.9",
                                        duration: "2031-2035",
                                        university: "Liberty State University"
                                    },
                                    {
                                        course: "High School Diploma",
                                        cgpa: "3.9",
                                        duration: "2027-2031",
                                        university: "Liberty State University"
                                    }
                                ]).map((edu, index) => (
                                    <div key={index}>
                                        <p className="text-xs font-semibold mt-1">{edu.university} </p>
                                        <div> {edu.duration}</div>
                                        <ul className="list-disc list-inside text-[10px] text-gray-700">
                                            <li>{edu.course}</li>
                                            <li>GPA {edu.cgpa}</li>

                                        </ul></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resume;
