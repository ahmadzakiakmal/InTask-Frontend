import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function EditButton() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="relative w-[105px] h-[44px]">
        <button className="w-full h-full bg-navy absolute rounded-[10px]"
        style={{top:'0px',left:'0px', alignItems:'center', justifyContent:'center', display:'flex',background:"#816797", border: '1px solid #5F4C6F'}}>
            <span style = {{fontSize:'16px', fontWeight:'600', color: "#FFFFFF"}}>Edit Profile</span>
        </button>
    </div>
  );
}