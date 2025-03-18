import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ResumeCraft ",
  description: "Build resumes with precision and creativity.",
  icons: {
    icon: "/ResumeCraft.jpg", // Path to your favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
    <link rel="icon" type="image/jpeg" href="/resumecraft.jpg" />
      <body
        className="antialiased text-white "
      >
        <div className="fixed left-0 top-0 -z-10 h-full w-full"><div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div></div></div>
        
        {children}
      </body>
    </html>
  );
}
