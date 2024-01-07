import Link from "next/link";
import "./globals.css";

import Navbar from "./component/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="px-[10px] py-[10px]">{children}</div>
      </body>
    </html>
  );
}
