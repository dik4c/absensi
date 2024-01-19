"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
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
}
