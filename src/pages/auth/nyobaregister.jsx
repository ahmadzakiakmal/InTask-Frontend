import Image from "next/image";
import InTaskLogin from "@/../public/InTaskLogin.png";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-white font-poppins">
    <section className="flex flex-col bg-navy rounded-[20px] w-[680px] h-[560px] mb-3 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-10 py-10 lg:py-20 mt-[-25px]">
            <div className="h-full py-10">
            <Image src={InTaskLogin} alt="InTask Logo" className="object-cover w-full h-full rounded-[20px] mt-[-40px]" />
            </div>
            
            <div className="py-5 pt-5" style={{ marginRight:"3rem", marginLeft:"-1rem", marginTop:"-1.5rem"}}>
                <p className="flex flex-col text-[30px] font-semibold justify-center items-center px-6 pt-6 pr-6" style = {{ color:  "#FBFACC" ,marginTop: "-3rem", marginRight:"2rem",marginBottom:"0.7rem"}}>Register!</p>
                <p className="flex flex-col text-[12px] font-regular justify-center items-center px-6" style = {{ color:  "#FBFACC", marginTop: "0.5rem", marginRigt:"2rem", marginBottom:"0.7rem" }}>Great idea to create your account now!</p>

            <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                if(!email.includes("@")) {
                setEmailValid(false);
                }
                if(username.length < 8) {
                setUsernameValid(false);
                }
                if(password.length < 8) {
                setPasswordValid(false);
                }
                if(password !== confirmPassword) {
                setConfirmPasswordValid(false);
                }
                if(!name || !email.includes("@") || username.length < 8 || password.length < 8 || confirmPassword !== password) return toast.error("Please fill all the fields!");
                axios
                .post(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
                    realName : name,
                    email,
                    username,
                    password,
                })
                .then(() => {
                    toast.success(
                    "Account created successfully! Verify your email to login."
                    );
                    router.replace("/");
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
            }}
            >
            <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"-0.1rem"}}>
                Name
                <input
                className="outline rounded-[3px] text-black h-[30px] px-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"-0.1rem"}}>                
            Email
                <input
                type="email"
                className={`outline ${isEmailValid ? "" : "outline-red-500"} rounded-[3px] text-black h-[30px] px-1.5`}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(e.target.value.includes("@"));
                }}
                />
                {!isEmailValid && (
                <p className="text-red-500 text-[11px]">Invalid email format.</p>
                )}
            </label>
            <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"-0.1rem"}}>                
            Username
                <input
                className={`outline ${isUsernameValid ? "" : "outline-red-500"} rounded-[3px] text-black h-[30px] px-1.5`}
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameValid(e.target.value.length >= 8);
                }}
                />
                {!isUsernameValid && (
                <p className="text-red-500 text-[11px]">Username must be at least 8 characters long.</p>
                )}
            </label>
            <label className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"-0.1rem"}}>                
            Password
                <input
                type="password"
                className={`outline ${isPasswordValid ? "" : "outline-red-500"} rounded-[3px] text-black h-[30px] px-1.5`}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(e.target.value.length >= 8);
                }}
                />
                {!isPasswordValid && (
                <p className="text-red-500 text-[11px]">Password must be at least 8 characters long.</p>
                )}
            </label>
            <label type="password" className="flex flex-col gap-3" style = {{ color:  "#FFFFFF", marginTop:"-0.1rem"}}>
                Confirm Password
                <input
                type="password"
                className={`outline ${isConfirmPasswordValid ? "" : "outline-red-500"} rounded-[3px] text-black h-[30px] px-1.5`}
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordValid(e.target.value === password);
                }}
                />
                {!isConfirmPasswordValid && (
                <p className="text-red-500 text-[11px]">Password must match.</p>
                )}
            </label>
            <p className="text-[14px]" style = {{ color:  "#FFFFFF", marginTop:"0.1rem" }}>
                {" "}
                Already have an account?{" "}
                <Link href="/auth/login" className="underline">
                Log in
                </Link>
                .
            </p>
            <button type="submit" className="bg-[#816797] text-white border-[#5F4C6F] py-1 rounded-[5px]">
                Register
            </button>
            </form>
            </div>
            </div>
        </section>
        </main>
  );
}