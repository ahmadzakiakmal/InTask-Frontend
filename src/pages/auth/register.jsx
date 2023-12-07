import Image from "next/image";
import InTaskLogin from "@/../public/InTaskLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { LoadingContext } from "@/context/LoadingContext";

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
  const [isNameValid, setNameValid] = useState(true);
  const { setLoading } = useContext(LoadingContext);

  const validateInput = (input) => {
    if (input == "") {
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    if (email == "" || !email.includes("@") || !email.includes("."))
      return false;
    return true;
  };

  const validateUsername = (username) => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (
      username == "" ||
      specialChars.test(username) ||
      username.includes("%") ||
      username.length < 4
    )
      return false;
    return true;
  };

  const validatePassword = (password) => {
    if (password == "" || password.length < 8) return false;
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password != confirmPassword) return false;
    return true;
  };

  const Register = () => {
    if(!name || !email || !username || !password || !confirmPassword) {
      return toast.error("Please fill all the fields!");
    }
    
    if (!isNameValid) {
      return toast.error("Please fill your name.");
    }
    if (!isEmailValid) {
      return toast.error("Email is not valid.");
    }
    if (!isUsernameValid) {
      return toast.error(
        "Username must be at least 4 characters and not contain special characters."
      );
    }
    if (!isPasswordValid) {
      return toast.error("Password must be at least 8 characters.");
    }
    if (!isConfirmPasswordValid) {
      return toast.error("Password and confirm password must be the same.");
    }

    setLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
        realName: name,
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="py-20 sm:py-10 flex flex-col justify-center items-center min-h-screen bg-neutral font-poppins px-[5%] md:px-0">
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
            Register
          </p>
          <p className="flex flex-col text-[12px] font-regular justify-center items-center text-center text-yellow">
            Register a new account to get started!
          </p>

          <form
            className="flex flex-col gap-[0.8rem] mt-5 md:mt-8 text-yellow w-[100vw] max-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
              Register();
            }}
          >
            <label className="flex flex-col gap-[0.4rem]">
              Full Name
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 w-full " +
                  (isNameValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameValid(validateInput(e.target.value));
                }}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Email
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 w-full " +
                  (isEmailValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValid(validateEmail(e.target.value));
                }}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Username
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 w-full " +
                  (isUsernameValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameValid(validateUsername(e.target.value));
                }}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Password
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 w-full " +
                  (isPasswordValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordValid(validatePassword(e.target.value));
                  setConfirmPasswordValid(
                    validateConfirmPassword(confirmPassword, e.target.value)
                  );
                }}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Confirm Password
              <input
                className={
                  "outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 w-full " +
                  (isConfirmPasswordValid
                    ? "outline-yellow"
                    : "outline outline-2 outline-red-500")
                }
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordValid(
                    validateConfirmPassword(e.target.value, password)
                  );
                }}
              />
            </label>
            <p className="text-[14px]">
              Registered before?{" "}
              <Link href="/auth/login" className="underline font-semibold">
                Login
              </Link>
              .
            </p>
            <Button type="submit" text="Register" className="!w-full mt-3" />
            <Link href="/">
              <Button
                type="button"
                text="Back to Home"
                className="!w-full !bg-neutral/50 hover:!bg-neutral/30 text-purple-100"
              />
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
