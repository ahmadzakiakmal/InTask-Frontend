import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Button({ text, onClick }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <button 
      onClick={onClick}
      className="w-max rounded-[10px] py-2 px-3 bg-purple-200 font-semibold text-white">
      <span>{text}</span>
    </button>
  );
}