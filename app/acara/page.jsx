"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../component/loading";

export default function Acara() {
  const [dataAcara, setDataAcara] = useState(null);
  const [filterKelompok, setFilterKelompok] = useState(undefined);
  const [filterNama, setFilterNama] = useState(undefined);
  const [page, setPage] = useState(1);

  const getDataAnggota = async () => {
    try {
      const filter = {
        kelompok: filterKelompok,
        page,
      };
      const res = await axios.post("/api/acara/get", filter);
      setDataAcara(res.data);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataAnggota();
  }, [filterKelompok, page, filterNama]);

  if (dataAcara === null) return <Loading />;

  return (
    <div className="w-full py-[20px]">
      <h1 className="text-headline">Pelajar</h1>

      {/* filter data */}
      <div className="flex flex-col gap-[10px]">
        {/* kelompok filter */}
        <div>
          <h1 className="font-poppins-bold text-[.7em]">kelompok :</h1>
          <div className="flex gap-[5px]">
            <button
              className={`btn-filter ${
                filterKelompok === "al-hikmah" ? "filter-active" : ""
              }`}
              onClick={() => {
                if (filterKelompok === "al-hikmah")
                  return setFilterKelompok(undefined);
                setFilterKelompok("al-hikmah");
              }}
            >
              al-hikmah
            </button>
            <button
              className={`btn-filter ${
                filterKelompok === "huznudzon billah" ? "filter-active" : ""
              }`}
              onClick={() => {
                if (filterKelompok === "huznudzon billah")
                  return setFilterKelompok(undefined);
                setFilterKelompok("huznudzon billah");
              }}
            >
              husnudzon billah
            </button>
            <button
              className={`btn-filter ${
                filterKelompok === "al-fatah" ? "filter-active" : ""
              }`}
              onClick={() => {
                if (filterKelompok === "al-fatah")
                  return setFilterKelompok(undefined);
                setFilterKelompok("al-fatah");
              }}
            >
              al-fatah
            </button>
            <button
              className={`btn-filter ${
                filterKelompok === "giri mekar" ? "filter-active" : ""
              }`}
              onClick={() => {
                if (filterKelompok === "giri mekar")
                  return setFilterKelompok(undefined);
                setFilterKelompok("giri mekar");
              }}
            >
              giri mekar
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    nama
                  </th>
                  <th scope="col" className="px-6 py-4">
                    kelompok
                  </th>
                  <th scope="col" className="px-6 py-4">
                    mulai
                  </th>
                  <th scope="col" className="px-6 py-4">
                    selesai
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAcara.result.map((i, idx) => {
                  return (
                    <tr className="border-b dark:border-neutral-500" key={idx}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {idx + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{i.nama}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.kelompok}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.gender}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex py-[15px]">
        <div className="flex gap-[10px]">
          <button
            className={`btn !bg-first ${
              page === 1 ? "cursor-not-allowed opacity-80" : "opacity-100"
            }`}
            onClick={() => {
              if (page === 1) return;
              setPage(page - 1);
            }}
          >
            prev
          </button>
          <button
            className={`btn !bg-first ${
              dataAcara.count <= 8
                ? "cursor-not-allowed opacity-80"
                : "opacity-100"
            }`}
            onClick={() => setPage(page + 1)}
          >
            next
          </button>
        </div>
        <Link href={"/pelajar/upload"} className="btn block w-fit ml-auto">
          add +
        </Link>
      </div>
    </div>
  );
}
