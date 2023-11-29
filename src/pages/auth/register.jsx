import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
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
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main
      className="flex flex-col justify-center items-center min-h-screen px-[5%] xs:px-auto"
      style={{ backgroundColor: "#1B2430" }}
    >
      <section className="py-10 xs:px-12 bg-yellow rounded-[20px] w-full xs:w-fit xs:min-w-[350px] flex flex-col gap-4 justify-center items-center my-10">
        <div className="p-2 bg-navy rounded-[10px] grid place-items-center">
          <Image src={InTaskLogo} alt="InTask Logo" className="max-w-[135px]" />
        </div>
        <p
          className="text-[20px] font-bold mt-0"
          style={{ color: "#1B2430", marginTop: "-0.4rem" }}
        >
          Register
        </p>
        <p
          className="text-[12px] mt-0"
          style={{ color: "#1B2430", marginTop: "-0.9rem" }}
        >
          Great idea to create your account now!
        </p>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if(!name || !email || !username || !password || !confirmPassword) return toast.error("Please fill all the fields!");
            if((password !== confirmPassword)) return toast.error("Passwords don't match!");
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
          <label className="flex flex-col gap-1">
            Name
            <input
              className="outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              className="outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Username
            <input
              className="outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              type="password"
              className="outline"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </label>
          <label type="password" className="flex flex-col gap-1">
            Confirm Password
            <input
              type="password"
              className="outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <p className="text-[14px]">
            {" "}
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
            .
          </p>
          <button type="submit" className="outline py-1">
            Register
          </button>
        </form>
      </section>
    </main>
  );
}
