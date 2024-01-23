"use client";

import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const idAcara = searchParams.get("s");

  return <div></div>;
};

export default Page;
