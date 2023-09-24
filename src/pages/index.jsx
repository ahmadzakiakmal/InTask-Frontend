import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <section className="p-10 px-12 bg-yellow rounded-[20px] outline flex flex-col gap-4 justify-center items-center">
        <div className="p-2 bg-navy rounded-[10px] grid place-items-center">
          <Image src={InTaskLogo} alt="InTask Logo" className="w-[150px]" />
        </div>
      
        <div className="flex flex-col gap-4 w-full">
          <Link href="/auth/login">
            <button className="outline py-1 w-full">Login</button>
          </Link>
          <Link href="/auth/register">
            <button className="outline py-1 w-full">Register</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
