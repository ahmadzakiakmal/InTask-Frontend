import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import InTaskLogoDark from "@/../public/InTaskLogoCircle.png";
import textInTaskLogo from "@/../public/textLogo.png";
import { useState } from "react";
import Button from "@/components/Button";
import Login from "./login";
import Register from "./register";

export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
    };
    
    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    const handleOpenRegister = () => {
        setIsRegisterOpen(true);
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false);
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen" style={{ backgroundColor: "#E3E3ED" }}>
            <header className="fixed top-0 w-full h-[70px] bg-navy z-10">
                <section className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-5">
                        <Image src={InTaskLogo} alt="InTask Logo" className="w-[50px]" style={{ marginTop: "-20px", marginLeft:"120px"}}/>
                        <Image src={textInTaskLogo} alt="TextInTask Logo" className="w-[110px] h-[85px]" style={{ marginTop: "-30px", marginLeft:"-20px"}}/>
                        {/* <label className="flex flex-col gap-1 font-semibold" style={{color:'#FFFECB', marginLeft:"-10px", fontSize:"24px"}}>
                        InTask 
                        </label> */}
                    </div>
                    <div className="flex items-center gap-5">
                        <button 
                            type="button" 
                            onClick={handleOpenLogin} 
                            className="cursor-pointer hover:text-blue-500" 
                            style={{ color:'#FFFFFF', marginTop:"-30px"}}
                            onMouseOver={(e)=> (e.currentTarget.style.color='#D6D5A8')}
                            onMouseOut={(e)=> (e.currentTarget.style.color='#FFFFFF')}
                            >Login 
                        </button>
                        <button 
                            type="button" 
                            onClick={handleOpenRegister} 
                            className="cursor-pointer hover:text-blue-500" 
                            style={{ color:'#FFFFFF', marginRight:'40px', marginTop:"-30px"}}
                            onMouseOver={(e)=> (e.currentTarget.style.color='#D6D5A8')}
                            onMouseOut={(e)=> (e.currentTarget.style.color='#FFFFFF')}
                            >Register
                        </button>
                    </div>
                </section>
            </header>

            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5">
            <div className="flex flex-col gap-5 lg:gap-10">
                <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
                Infinite Task <br className="lg:flex hidden"/><br className="lg:flex hidden" />
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500" style={{marginTop:"-80px"}}>
                InTask (Infinite Task) merupakan aplikasi web manajemen tugas yang membantu <br  className="lg:flex hidden"/> 
                pengguna untuk membuat, mengelola, dan memonitor project atau tugas dengan <br className="lg:flex hidden"/>
                lebih efisien.
                </p>
            <button className="btn btn-sm lg:btn-lg bg-[#816797] text-white rounded-full border-[#5F4C6F] w-40 lg:w-44 capitalize" style={{marginTop:"-15px", height:"36px"}}>Get Started</button>
            </div>
            <Image src={InTaskLogoDark} alt="InTask Logo" className="w-[250px]" style={{marginLeft:"30px"}}/>
            </div>

        </main>
    );
}
