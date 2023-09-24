import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function VerifyUser() {
  const [state, setState] = useState(0); // ? 0 = loading, 1 = success, 2 = error
  const router = useRouter();
  useEffect(() => {
    const token = router.query.token;
    if(!token) return;
    setTimeout(() => {
      axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify/?token=${token}`)
        .then(() => setState(1))
        .catch(() => setState(2));
    }, 2000);
  }, [router]);
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-navy gap-8 bg-neutral">
      <section className="p-2 bg-navy rounded-[10px] grid place-items-center">
        <Image src={InTaskLogo} alt="InTask Logo" className="w-[150px]" priority />
      </section>

      <section>
        {state === 0 ? (
          <div className="max-w-[250px] flex flex-col gap-3">
            <p className="text-center">
              Please wait while we verify your account
            </p>
            <div className="flex gap-4 justify-center">
              <div className="w-[10px] aspect-square rounded-full bg-navy animate-bounce" />
              <div className="w-[10px] aspect-square rounded-full bg-navy animate-bounce delay-200" />
              <div className="w-[10px] aspect-square rounded-full bg-navy animate-bounce" />
            </div>
          </div>
        ) : (
          ""
        )}
        
        {state === 1 ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-center">Verification success!</p>
            <button
              onClick={() => router.replace("/auth/login")}
              className="outline py-1 px-3"
            >
              Log In
            </button>
          </div>
        ) : (
          ""
        )}

        {
          state === 2 ? (<div className="flex flex-col justify-center items-center gap-3">
            <p className="text-center">An error occured! <br/> Please try again later.</p>
          </div>) : ""
        }
      </section>
    </main>
  );
}
