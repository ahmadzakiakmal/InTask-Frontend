import Image from "next/image";
import InTaskLogin from "@/../public/InTaskLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isIdentifierValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const validateInput = (input) => {
    if (input == "") {
      return false;
    }
    return true;
  };

  const Login = () => {
    if (isIdentifierValid == false || isPasswordValid == false) {
      return toast.error("Please fill all the fields!");
    }
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        identifier,
        password,
      })
      .then((res) => {
        toast.success("Logged in successfully!");
        Cookies.set("Authorization", res.data.token, {
          path: "/",
          domain:
            process.env.NEXT_PUBLIC_API_URL === "http://localhost:5000"
              ? "localhost"
              : "vertech.id",
          expires: 1/3,
        });
        const id = res.data.data.id;
        const username = res.data.data.username;
        localStorage.setItem("userId", id);
        localStorage.setItem("username", username);
        router.replace("/dashboard");
      })
      .catch((err) => {
        if (err.response) return toast.error(err.response.data.message);
        toast.error("An error occurred while logging in!");
      });
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-neutral font-poppins px-[5%] md:px-0">
      <section className="flex flex-col items-center justify-center md:flex-row md:gap-[100px] bg-navy rounded-[20px] p-8 md:p-10">
        <div className="flex-shrink-0 w-[150px] md:w-auto">
          <Image
            src={InTaskLogin}
            alt="InTask Logo"
            className="object-cover w-full h-full rounded-[20px]"
          />
        </div>

        <div>
          <p className="flex flex-col text-[30px] font-semibold justify-center items-center text-yellow">
            Login
          </p>
          <p className="flex flex-col text-[12px] font-regular justify-center items-center text-center text-yellow">
            Welcome back! Enter your details here!
          </p>

          <form
            className="flex flex-col gap-[0.8rem] mt-5 md:mt-8 text-yellow w-[100vw] max-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
              Login();
            }}
          >
            <label className="flex flex-col gap-[0.4rem]">
              Username / Email
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 " +
                  (isIdentifierValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setEmailValid(validateInput(e.target.value));
                }}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Password
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 " +
                  (isPasswordValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordValid(validateInput(e.target.value));
                }}
              />
            </label>
            <p className="text-[14px]">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline font-semibold">
                Register
              </Link>
              .
            </p>
            <Button type="submit" text="Login" className="!w-full !mt-3" />
            <Link href="/">
              <Button type="button" text="Back to Home" className="!w-full !bg-neutral/50 hover:!bg-neutral/30 text-purple-100" />
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
