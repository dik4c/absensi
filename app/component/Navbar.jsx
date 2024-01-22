"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DesktopNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [buttonActive, setButtonActive] = useState("dashboard");
  return (
    <nav>
      <div
        className={`bg-first w-[50%] md:w-[20%] text-third px-[10px] md:px-[15px] py-[20px] rounded-md h-fit bottom-[2%] fixed duration-300 z-50 ${
          showNav ? "left-[20px]" : "-left-[55%] md:-left-[25%]"
        }`}
      >
        {/* logo */}
        <div className="pb-[20px]">
          <h1 className="text-[2em] font-poppins-bold text-second">JCO</h1>
        </div>

        {/* navigasi */}
        <div className="flex flex-col gap-[15px] font-montserrat-bold text-[.9em]">
          <Link
            href="/"
            className={buttonActive === "dashboard" ? "nav-active" : ""}
            onClick={() => setButtonActive("dashboard")}
          >
            Dashboard
          </Link>
          <Link
            href="/pelajar"
            className={buttonActive === "pelajar" ? "nav-active" : ""}
            onClick={() => setButtonActive("pelajar")}
          >
            Pelajar
          </Link>
          <Link
            href="/acara"
            className={buttonActive === "acara" ? "nav-active" : ""}
            onClick={() => setButtonActive("acara")}
          >
            Acara
          </Link>
        </div>

        {/* button */}
        <button
          className={`absolute bottom-[10px] w-[20%] lg:w-[15%] duration-500 ${
            showNav ? "right-[-10%]" : "right-[-35%] md:right-[-50%]"
          }`}
          onClick={() => setShowNav(!showNav)}
        >
          <img
            src={`/${showNav ? "kiri" : "kanan"}.svg`}
            className="bg-third rounded-full w-full"
            alt=""
          />
        </button>
      </div>
    </nav>
  );
};

const MobileNav = () => {
  return (
    <div className="w-full fixed bottom-0 bg-first text-center text-white font-montserrat-bold text-[.9em] py-[10px] z-50">
      <div className="flex justify-between items-center px-[15px]">
        <div className="w-[40%] flex gap-[40px]">
          <Link className="w-fit" href={"/pelajar"}>
            <img src="/people-white.svg" className="w-[25px]" alt="" />
          </Link>

          <Link className="w-fit" href={"/acara"}>
            <img src="/calendar-white.svg" className="w-[25px]" alt="" />
          </Link>
        </div>

        <div className="w-[40%] flex flex-row-reverse gap-[40px]">
          <Link className="w-fit" href={"/info"}>
            <img src="/info.svg" className="w-[25px]" alt="" />
          </Link>

          <Link className="w-fit" href={"/help"}>
            <img src="/help.svg" className="w-[25px]" alt="" />
          </Link>
        </div>
        <Link
          className="w-[40px] h-[40px] p-[10px] bg-second rounded-full fixed bottom-[-3px] left-[50%] transform -translate-x-1/2 -translate-y-1/2 outline outline-[10px] outline-first"
          href={"/"}
        >
          <img src="/dashboard.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [buttonActive, setButtonActive] = useState("dashboard");
  const [lebar, setLebar] = useState(0);

  useEffect(() => {
    setLebar(window.innerWidth);
  }, []);

  if (lebar > 320) {
    return <DesktopNav />;
  }

  if (lebar <= 320) {
    return <MobileNav />;
  }
}
