import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Button({ text }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <button className="w-max rounded-[10px] py-2 px-3 bg-purple-200 font-semibold text-white">
      <span>{text}</span>
    </button>
  );
}