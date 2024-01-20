"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../component/loading";
import Delete from "../component/delete";
import Filter from "../component/Filter";

export default function Pelajar() {
  const [dataAnggota, setDataAnggota] = useState(null);
  const [filterKelompok, setFilterKelompok] = useState(undefined);
  const [filterGender, setFilterGender] = useState(undefined);
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [popupButtonIndex, setPopupButtonIndex] = useState(undefined);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [uid, setUid] = useState(undefined);
  const [page, setPage] = useState(1);

  const filterData = [
    {
      name: "kelompok",
      filter: { condition: filterKelompok, set: setFilterKelompok },
      option: ["al-hikmah", "husnudzon billah", "al-fatah", "giri mekar"],
    },
    {
      name: "gender",
      filter: { condition: filterGender, set: setFilterGender },
      option: ["pria", "wanita"],
    },
    {
      name: "status",
      filter: { condition: filterStatus, set: setFilterStatus },
      option: ["pelajar", "mahasiswa", "usia menikah"],
    },
  ];

  const getDataAnggota = async () => {
    try {
      const filter = {
        kelompok: filterKelompok,
        gender: filterGender,
        status: filterStatus,
        page,
      };
      const res = await axios.post("/api/anggota/get", filter);
      setDataAnggota(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataAnggota();
  }, [filterGender, filterKelompok, filterStatus, page]);

  if (dataAnggota === null) return <Loading />;

  return (
    <div className="w-full py-[20px]">
      {/* delete dialog */}
      {deleteDialog && (
        <Delete
          type={"anggota"}
          uid={uid}
          setDeleteDialog={setDeleteDialog}
          dataAnggota={dataAnggota}
          setDataAnggota={setDataAnggota}
        />
      )}

      {/* headline */}
      <h1 className="text-headline">Pelajar</h1>

      {/* filter data */}
      <Filter filterData={filterData} />

      {/* table */}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    nama
                  </th>
                  <th scope="col" className="px-6 py-4">
                    kelompok
                  </th>
                  <th scope="col" className="px-6 py-4">
                    gender
                  </th>
                  <th scope="col" className="px-6 py-4">
                    status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    option
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAnggota.map((i, idx) => {
                  return (
                    <tr className="border-b dark:border-neutral-500" key={idx}>
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
                      <td className="whitespace-nowrap px-6 py-4 relative">
                        <div
                          className={`flex flex-col gap-[5px] absolute bg-third shadow-md rounded-sm px-[15px] py-[10px] -left-[40px] -bottom-[10px] z-50 ${
                            popupButtonIndex === idx ? "" : "hidden"
                          }`}
                        >
                          <Link href={`/pelajar/edit?s=${i._id}`}>edit</Link>
                          <Link href={`/pelajar/details?s=${i._id}`}>
                            details
                          </Link>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              setUid(i._id);
                              setPopupButtonIndex(undefined);
                              setDeleteDialog(true);
                            }}
                          >
                            hapus
                          </button>
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
              dataAnggota.count <= 8
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
