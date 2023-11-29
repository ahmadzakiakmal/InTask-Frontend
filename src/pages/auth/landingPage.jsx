import Image from "next/image";
import InTaskLogo from "@/../public/InTaskLogo.png";
import InTaskLogoDark from "@/../public/InTaskLogoCircle.png";
import textInTaskLogo from "@/../public/textLogo.png";
import { useState } from "react";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  // const handleCloseLogin = () => {
  //   setIsLoginOpen(false);
  // };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  //   const handleCloseRegister = () => {
  //     setIsRegisterOpen(false);
  //   };

  return (
    <>
      {/* Pindah ke index.jsx */}
    </>
  );
}
