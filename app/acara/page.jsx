"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../component/loading";
import Filter from "../component/Filter";

export default function Acara() {
  const [dataAcara, setDataAcara] = useState(null);
  const [filterKelompok, setFilterKelompok] = useState(undefined);
  const [filterNama, setFilterNama] = useState(undefined);
  const [page, setPage] = useState(1);
  const [popupButtonIndex, setPopupButtonIndex] = useState(null);

  const filterData = [
    {
      name: "kelompok",
      filter: { condition: filterKelompok, set: setFilterKelompok },
      option: ["al-hikmah", "husnudzon billah", "al-fatah", "giri mekar"],
    },
  ];

  const getDataAnggota = async () => {
    try {
      const filter = {
        tempat: filterKelompok,
        page,
      };
      const res = await axios.post("/api/acara/get", filter);
      setDataAcara(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataAnggota();
  }, [filterKelompok, page, filterNama]);

  if (dataAcara === null) return <Loading />;

  return (
    <div className="w-full py-[20px] pb-[100px]">
      <h1 className="text-headline">Acara</h1>

      {/* filter data */}
      <Filter filterData={filterData} />
      {/* table */}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    nama
                  </th>
                  <th scope="col" className="px-6 py-4">
                    tempat
                  </th>
                  <th scope="col" className="px-6 py-4">
                    waktu
                  </th>
                  <th scope="col" className="px-6 py-4">
                    mulai
                  </th>
                  <th scope="col" className="px-6 py-4">
                    selesai
                  </th>
                  <th scope="col" className="px-6 py-4">
                    option
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAcara.result.map((i, idx) => {
                  return (
                    <tr className="border-b dark:border-neutral-500" key={idx}>
                      <td className="whitespace-nowrap px-6 py-4">{i.nama}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.tempat}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{i.waktu}</td>
                      <td className="whitespace-nowrap px-6 py-4">{i.mulai}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.selesai}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 relative">
                        <div
                          className={`flex flex-col gap-[5px] absolute bg-third shadow-md rounded-sm px-[15px] py-[10px] -left-[40px] -bottom-[10px] z-50 ${
                            popupButtonIndex === idx ? "" : "hidden"
                          }`}
                        >
                          <Link href={`/acara/edit?s=${i._id}`}>edit</Link>
                          <Link href={`/acara/details?s=${i._id}`}>
                            details
                          </Link>
                          <button className="text-red-500">hapus</button>
                        </div>
                        <button
                          className="w-[25px] cursor-pointer"
                          onClick={() => {
                            if (popupButtonIndex === idx)
                              return setPopupButtonIndex(undefined);
                            setPopupButtonIndex(idx);
                          }}
                        >
                          <img
                            src={
                              popupButtonIndex === idx
                                ? "/x.svg"
                                : "/option.svg"
                            }
                            alt=""
                          />
                        </button>
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
            className={`btn !bg-first !shadow-none ${
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
            className={`btn !bg-first !shadow-none ${
              dataAcara.count <= 8
                ? "cursor-not-allowed opacity-80"
                : "opacity-100"
            }`}
            onClick={() => {
              if (dataAcara.count <= 8) return;
              setPage(page + 1);
            }}
          >
            next
          </button>
        </div>
        <Link href={"/acara/upload"} className="btn block w-fit ml-auto">
          add +
        </Link>
      </div>
    </div>
  );
}
