import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function AddProjectButton() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="relative w-[70px] h-[70px]">
        <button className="w-full h-full bg-navy absolute top-0 left-0 py-5 px-5 rounded-full"
        style={{top:'0px',left:'0px', alignItems:'center', justifyContent:'center', display:'flex'}}>
            <span style = {{fontSize:'60px', fontWeight:'semi-bold', color: "#D6D5A8"}}>+</span>
        </button>
    </div>
  );
}
