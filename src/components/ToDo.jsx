import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ToDoItem() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="relative w-[228px] h-[40px]">
        <button className="w-full h-full bg-navy absolute top-0 left-0 py-5 px-5 rounded-[10px]"
        style={{top:'0px',left:'0px', alignItems:'center', justifyContent:'flex-left', display:'flex',background:"#4B4B4B"}}>
            <span style = {{fontSize:'16px', fontWeight:'regular', color: "#D6D5A8"}}>Discussion</span>
        </button>
    </div>
  );
}