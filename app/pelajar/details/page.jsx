"use client";
import Loading from "@/app/component/loading";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailsAnggota() {
  const searchParams = useSearchParams();
  const idAnggota = searchParams.get("s");
  const [dataAnggota, setDataAnggota] = useState(undefined);

  const getData = async () => {
    try {
      const res = await axios.post("/api/anggota/get", { idAnggota });
      setDataAnggota(res.data.result[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (dataAnggota == undefined) return <Loading />;

  return (
    <div>
      <h1 className="text-headline">Details </h1>

      <div className="absolute bg-first w-[90%] px-[10px] py-[20px] rounded-md text-third my-[30px]">
        <img
          src="/logo.JPG"
          className="rounded-full w-[15%] mx-auto border-third border-[3px] absolute -top-[20px]"
          alt=""
        />
        <h1 className="font-poppins-bold text-center text-second py-[10px]">
          {dataAnggota.nama}
        </h1>
        <div className="font-robotomono-medium text-[.7em]">
          <p className="font-robotomono-medium text-[1em] text-center pb-[8px]">
            -------- details --------
          </p>
          <ul className="flex flex-col gap-[5px]">
            <li>kelompok: {dataAnggota.kelompok}</li>
            <li>gender: {dataAnggota.gender}</li>
            <li>status: {dataAnggota.status}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
