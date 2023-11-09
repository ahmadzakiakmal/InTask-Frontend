import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center min-h-screen" style = {{ backgroundColor: "#1B2430" }}>
      <section className="p-10 px-12 bg-yellow rounded-[20px]  w-[350px] h-[490px] flex flex-col gap-4 justify-center items-center">
        <div className="p-2 bg-navy rounded-[10px] grid place-items-center">
          <Image src={InTaskLogo} alt="InTask Logo" className="w-[150px]" />
        </div>

        <form className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            router.replace("/dashboard");
          }}
        >
          <label className="flex flex-col gap-1">
            Username / Email
            <input className="outline" />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input className="outline" />
          </label>
          <p className="text-[14px]">Don&apos;t have an account? <Link href="/auth/register" className="underline">Register</Link>.</p>
          <button type="submit" className="outline py-1">Log In</button>
        </form>
      </section>
    </main>
  );
}
