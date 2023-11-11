import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProjectCardComponent() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="relative w-[276px] h-[120px]">
        <button className="w-full h-full bg-navy py-8 px-5 rounded-[15px] ">
        </button>
        <button className="w-full h-[54px] bg-yellow absolute top-0 left-0 py-5 px-5 rounded-tl-[15px] rounded-tr-[15px]"
        style={{top:'0px',left:'0px', alignItems:'center', justifyContent:'flex-start', display:'flex'}}>
            <span style = {{fontSize:'22px', fontWeight:'bold', color: "#1B2430"}}>Project 1</span>
        </button>
    </div>
  );
}
