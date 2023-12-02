import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
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
    <main className="flex flex-col justify-center items-center min-h-screen px-[5%] xs:px-auto" style = {{ backgroundColor: "#1B2430" }}>
      <section className="py-10 xs:px-12 bg-yellow rounded-[20px] w-full xs:w-fit xs:min-w-[350px] flex flex-col gap-4 justify-center items-center">
        <div className="p-2 bg-navy rounded-[10px] grid place-items-center">
          <Image src={InTaskLogo} alt="InTask Logo" className="max-w-[135px]" />
        </div>
        <p className="text-[20px] font-bold mt-0" style = {{ color:  "#1B2430", marginTop: "-0.4rem" }}>Login</p>
        <p className="text-[12px] mt-0" style = {{ color:  "#1B2430", marginTop: "-0.9rem" }}>Welcome back! Enter your details here!</p>

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
          <label className="flex flex-col gap-1">
            Username / Email
            <input 
              className="outline rounded-[3px]" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)} 
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input 
              className="outline rounded-[3px]" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-[14px]">Don&apos;t have an account? <Link href="/auth/register" className="underline">Register</Link>.</p>
          <button type="submit" className="outline py-1">Log In</button>
        </form>
      </section>
    </main>
  );
}
