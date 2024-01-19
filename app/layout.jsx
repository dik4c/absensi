import Link from "next/link";
import "./globals.css";

import Navbar from "./component/Navbar";

export const metadata = {
  title: "Muda Mudi Jaten",
  description: "webapp absensi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="px-[10px] py-[10px] xl:px-[30px] w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
