import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import textInTaskLogo from "@/../public/textLogo.png";
import InTaskLogoDark from "@/../public/InTaskLogoCircle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-neutral font-poppins">
      <nav className="fixed top-0 w-full bg-navy z-10 flex justify-between px-[5%] xs:px-4 sm:px-7">
        <div className="flex items-center">
          <Image
            src={InTaskLogo}
            alt="InTask Logo"
            className="w-[50px] py-1 hidden xs:block"
          />
          <Image
            src={textInTaskLogo}
            alt="TextInTask Logo"
            className="w-[80px] py-3"
          />
          {/* <label className="flex flex-col gap-1 font-semibold" style={{ color:"#FFFECB", marginLeft:"-10px", fontSize:"24px" }}>
                      InTask 
          </label> */}
        </div>
        <div className="flex items-center gap-5">
          <Link href="/auth/login">
            <button
              type="button"
              className="cursor-pointer hover:text-yellow text-white hidden sm:block"
            >
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button
              type="button"
              className="cursor-pointer hover:text-yellow text-white hidden sm:block"
            >
              Register
            </button>
          </Link>
          <div className="sm:hidden">
            <FontAwesomeIcon
              icon={faBars}
              className="text-yellow text-2xl"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            />
          </div>
          {/* //? Mobile Menu */}
          <div
            className={
              "absolute sm:hidden bg-navy outline outline-yellow outline-1 shadow-[0_2px_10px_#000] top-[calc(100%+10px)] right-[5%] xs:right-[16px] rounded-[10px] grid transition-[grid-template-rows] px-10 " +
              (openMobileMenu ? "grid-rows-[1fr]" : "grid-rows-[0fr] !shadow-none !outline-none")
            }
          >
            <div
              className={
                "flex overflow-hidden transition-[padding] flex-col gap-3 py-8 " +
                (!openMobileMenu ? "!p-0" : "")
              }
            >
              <h1 className="text-[18px] text-yellow font-semibold">Menu</h1>
              <Link href="/auth/login" className="block">
                <button
                  type="button"
                  className="cursor-pointer hover:text-yellow text-white"
                >
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button
                  type="button"
                  className="cursor-pointer hover:text-yellow text-white"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-10 mb-10 lg:pt-0 lg:mb-10 md:px-10 xl:px-auto flex flex-col-reverse w-full lg:flex-row justify-center lg:justify-evenly max-w-[1600px] items-center gap-10 xl:gap-0 min-h-screen">
        <div className="flex flex-col gap-5 items-center lg:gap-10 px-[5%] sm:px-0 ">
          <h1 className="text-center lg:text-left w-full text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium">
            Infinite Task
          </h1>
          <p className="text-base text-justify sm:text-lg lg:text-[20px] text-gray-500 w-full xs:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
            InTask (Infinite Task) merupakan aplikasi web manajemen tugas yang
            membantu pengguna untuk membuat, mengelola, dan memonitor project
            atau tugas dengan lebih efisien.
          </p>
          <Link href="/auth/register">
            <button className="btn btn-sm lg:btn-lg bg-[#816797] self-center lg:self-start text-white rounded-full border-[#5F4C6F] w-40 lg:w-44 capitalize py-2">
            Get Started
            </button>
          </Link>
        </div>
        <Image
          src={InTaskLogoDark}
          alt="InTask Logo"
          className="w-[220px] md:w-[250px] lg:w-[300px] xl:w-[350px] flex-shrink-0"
        />
      </section>
    </main>
  );
}
