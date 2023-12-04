import Image from "next/image";
import InTaskLogin from "@/../public/InTaskLogin.png";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-white font-poppins">
        <section className="flex flex-col bg-navy rounded-[20px] w-[680px] h-[400px] mb-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-10 py-10 lg:py-20 mt-[-25px]">
                <div className="h-full">
                <Image src={InTaskLogin} alt="InTask Logo" className="object-cover w-full h-full rounded-[20px] mt-[-40px]" />
                </div>

                <div style={{marginRight:"3rem", marginLeft:"-1rem"}}>
                    <p className="flex flex-col text-[30px] font-semibold justify-center items-center px-6 pt-6 pr-6" style = {{ color:  "#FBFACC" ,marginTop: "-3rem", marginRight:"2rem",marginBottom:"0.7rem"}}>Login</p>
                    <p className="flex flex-col text-[12px] font-regular justify-center items-center px-6" style = {{ color:  "#FBFACC", marginTop: "0.5rem", marginRigt:"2rem", marginBottom:"0.7rem" }}>Welcome back! Enter your details here!</p>

                    <form className="flex flex-col gap-2" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        if(!identifier || !password) return toast.error("Please fill all the fields!");
                        axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
                        identifier,
                        password,
                        }).then((res) => {
                        toast.success("Logged in successfully!");
                        Cookies.set("Authorization", res.data.token, {
                            path: "/",
                            domain:
                            process.env.NEXT_PUBLIC_API_URL === "http://localhost:5000"
                                ? "localhost"
                                : process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
                        });
                        const id = res.data.data.id;
                        const username = res.data.data.username;
                        localStorage.setItem("userId", id);
                        localStorage.setItem("username", username);
                        router.replace("/dashboard");
                        }).catch((err) => {
                        if(err.response) return toast.error(err.response.data.message);
                        toast.error("An error occurred while logging in!");
                        // router.replace("/dashboard");
                        });
                    }}
                    >
                    <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"0.5rem"}}>
                        Username / Email
                        <input 
                        className="outline rounded-[3px] text-black h-[30px] px-1.5" 
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)} 
                        />
                    </label>
                    <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"0.5em" }}>
                        Password
                        <input 
                        className="outline rounded-[3px] text-black h-[30px] px-1.5" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <p className="text-[14px]" style = {{ color:  "#FFFFFF", marginTop:"0.8rem" }}>Don&apos;t have an account? <Link href="/auth/register" className="underline">Register</Link>.</p>
                    <button type="submit" className="bg-[#816797] text-white border-[#5F4C6F] py-1 rounded-[5px]">Log In</button>
                    </form>
                </div>
            </div>
        </section>

    </main>
    
  
)};
    