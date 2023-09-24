import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <main className="flex p-10 bg-neutral">
      <aside className="flex-shrink-0">
        <div className="w-fit min-h-screen bg-navy py-8 px-5 rounded-[15px]">
          <Link href="/">
            <Image src={InTaskLogo} alt="InTask Logo" className="w-[216px] p-5" />
          </Link>

          <ul className="text-yellow text-[18px] flex flex-col gap-1">
            <li>
              <Link
                href="/dashboard"
                className={`py-2 px-3 cursor-pointer flex items-center gap-4 rounded-[10px] ${
                  pathname === "/dashboard" ? "bg-white/10" : ""
                }`}
              >
                <span className="inline-block w-[20px] aspect-square rounded-[4px] bg-yellow" />
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/tasks"
                className={`py-2 px-3 cursor-pointer flex items-center gap-4 rounded-[10px] ${
                  pathname === "/dashboard/tasks" ? "bg-white/10" : ""
                }`}
              >
                <span className="inline-block w-[20px] aspect-square rounded-[4px] bg-yellow" />
                Tasks
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/user"
                className={`py-2 px-3 cursor-pointer flex items-center gap-4 rounded-[10px] ${
                  pathname === "/dashboard/user" ? "bg-white/10" : ""
                }`}
              >
                <span className="inline-block w-[20px] aspect-square rounded-[4px] bg-yellow" />
                User
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <section className="text-navy p-10 outline w-full">{children}</section>
    </main>
  );
}
