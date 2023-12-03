import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import textInTaskLogo from "@/../public/textLogo.png";
import InTaskLogoDark from "@/../public/InTaskLogoCircle.png";
import DashboardPict from "@/../public/Dashboard.png";
import ProjectPict from "@/../public/Project.png";
import TaskPict from "@/../public/Task.png";
import Jaki from "@/../public/Jaki.png";
import Salwa from "@/../public/Salwa.png";
import Duta from "@/../public/Duta.png";
import Galih from "@/../public/Galih.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-white font-poppins">
      <nav className="fixed top-0 w-full bg-navy z-10 flex justify-between px-[5%] xs:px-4 sm:px-7">
        <div className="flex items-center cursor-pointer">
          <Image
            src={InTaskLogo}
            alt="InTask Logo"
            className="w-[50px] py-2 hidden xs:block"
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
          <Link href="/auth/register" className="self-center lg:self-start">
            <button className="btn btn-sm lg:btn-lg bg-[#816797] text-white rounded-full border-[#5F4C6F] w-40 lg:w-44 capitalize py-2">
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

      {/* //? section fitur */}
      <section className="pt-10 mb-10 lg:pt-0 lg:mb-10 md:px-10 xl:px-auto flex flex-col-reverse w-full lg:flex-row justify-center lg:justify-evenly max-w-[1600px] items-center gap-10 xl:gap-0 min-h-screen">
        <div className="container mx-auto py-20">
          <p className="text-3xl lg:text-5xl font-semibold text-navy" style={{ marginBottom: "-2rem", marginTop:"-3rem" }}>Our Fitur</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-10 lg:py-20 mt-0">
            <div className="flex flex-col gap-5 mt-0.1 ">
              <Image src={DashboardPict} alt="Project Picture" className="shadow-[0_0_8px_rgba(0,0,0,.5)] rounded-[10px]" />
              <p className="text-2xl font-semibold">Project</p>
              <div className="flex items-center gap-2">
                <p className="text-base text-justify sm:text-lg text-gray-500 text-center lg:text-[15px] mb-10">
              Pada fitur project, pengguna dapat membuat dan mengelola 
              project-project yang akan atau sedang dilakukan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 ">
              <Image src={ProjectPict} alt="Isi Project" className="shadow-[0_0_8px_rgba(0,0,0,.5)] rounded-[10px]"/>
              <p className="text-2xl font-semibold">Isi dari project</p>
              <div className="flex items-center gap-2">            
                <p className="text-base text-justify sm:text-lg text-gray-500 text-center lg:text-[15px] mb-10">
            Pengguna dapat mengisi tugas-tugas atau task yang akan dilakukan (to do), 
            yang sedang dikerjakan (doing), dan yang sudah selesai dikerjakan (done).
                </p>
              </div>
            </div>
        
            <div className="flex flex-col gap-5 ">
              <Image src={TaskPict} alt="Fitur Task" className="shadow-[0_0_8px_rgba(0,0,0,.5)] rounded-[10px]"/>
              <p className="text-2xl font-semibold">Task</p>
              <div className="flex items-center gap-2">
                <p className="text-base text-justify sm:text-lg text-gray-500 text-center lg:text-[15px] mb-10">
                Pada fitur Task, pengguna dapat membuat dan mengelola tugas-tugas individual dengan memberikan status tugas, seperti Todo, In Progress, dan Done. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* //? section anggota */}
      <section className="pt-10 mb-10 lg:pt-0 lg:mb-10 md:px-10 xl:px-auto flex flex-col-reverse w-full lg:flex-row justify-center lg:justify-evenly max-w-[1600px] items-center gap-10 xl:gap-0 min-h-screen">
        <div className="container mx-auto py-20">
          <p className="text-base lg:text-xl font-medium text-gray-500 uppercase" style={{ marginTop:"-9rem" }}>Kelompok 1</p>
          <p className="text-3xl lg:text-5xl font-semibold text-navy mt-3"  style={{ marginBottom:"-2rem" }}>Meet our member!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-16 py-10 lg:py-20">
            <div className="flex flex-col gap-5 ">
              <Image src={Jaki} alt="Ahmad Zaki Akmal"/>
              <p className="text-2xl font-semibold  text-center">Ahmad Zaki Akmal</p>
              <div className="flex items-center gap-2 justify-center">
                <p className="text-gray-500" style={{marginTop:"-1rem"}}>21/480179/TK/52981</p>
              </div>
            </div>
              
            <div className="flex flex-col gap-5 ">
              <Image src={Salwa} alt="Salwa Maharani" />
              <p className="text-2xl font-semibold text-center">Salwa Maharani</p>
              <div className="flex items-center justify-center gap-2 ">
                <p className="text-gray-500 " style={{marginTop:"-1rem"}}>21/481194/TK/53113</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 ">
              <Image src={Duta} alt="Duta Pradana"/>
              <p className="text-2xl font-semibold  text-center">Diestra Pradana</p>
              <div className="flex items-center gap-2 justify-center">
                <p className="text-gray-500" style={{marginTop:"-1rem"}}>21/478179/TK/52693</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 ">
              <Image src={Galih} alt="Nicholas Galih"/>
              <p className="text-2xl font-semibold  text-center">Nicholas Galih</p>
              <div className="flex items-center gap-2 justify-center">
                <p className="text-gray-500" style={{marginTop:"-1rem"}}>21/482747/TK/53361</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* //? footer */}
      <div id="section_footer" style={{ marginTop:"-7rem", }}>
        <div className='text-center py-4'>
          <Link href="https://github.com/ahmadzaki2975/InTask-Frontend.git" target="_blank" className='btn btn-link'>
            <span className="font-bold hover:text-blue-500">Our Github repository</span>
          </Link>
          <p style={{ marginBottom:"2rem" }}>Infinite Task | Kelompok 1</p>
        </div>
      </div>

    </main>
  );
}
