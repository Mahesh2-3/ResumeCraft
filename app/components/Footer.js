export default function Footer() {
    return (
        <footer className="bg-[#071027]  w-full h-[9vh] text-white py-6">
            <div className="container flex justify-around items-center mx-auto text-center">
                {/* Brand Name */}
                <h2 className="text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 font-extrabold">ResumeCraft</h2>

                {/* Copyright */}
                <p className="text-sm w-[50%] md:text-xl ">
                    © {new Date().getFullYear()} ResumeCraft. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
