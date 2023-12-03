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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);

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
          <label className="flex flex-col gap-1">
            Name
            <input
              className="outline rounded-[3px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              className={`outline ${isEmailValid ? "" : "outline-red-500"} rounded-[3px]`}
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
          <label className="flex flex-col gap-1">
            Username
            <input
              className={`outline ${isUsernameValid ? "" : "outline-red-500"} rounded-[3px]`}
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
          <label className="flex flex-col gap-1">
            Password
            <input
              type="password"
              className={`outline ${isPasswordValid ? "" : "outline-red-500"} rounded-[3px]`}
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
          <label type="password" className="flex flex-col gap-1">
            Confirm Password
            <input
              type="password"
              className={`outline ${isConfirmPasswordValid ? "" : "outline-red-500"} rounded-[3px]`}
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
          <p className="text-[14px]">
            {" "}
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
            .
          </p>
          <button type="submit" className="outline py-1 rounded-[3px]">
            Register
          </button>
        </form>
      </section>
    </main>
  );
}
