"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadAcara() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataAcara, setDataAcara] = useState({
    nama: "",
    tempat: "al-hikmah",
    waktu: null,
    mulai: null,
    selesai: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/acara/upload", dataAcara);
      setLoading(false);
      if (res.status === 201) {
        router.replace("/acara");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="py-[50px]">
      {/* loading */}
      {loading && (
        <div className="w-full h-full fixed backdrop-blur-sm bg-white/30 z-40 inset-0">
          <div className="fixed w-[90%] md:w-[50%] bg-white rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50">
            <h1 className="text-black font-montserrat-bold text-[1.5rem] text-center py-[70px]">
              tunggu sebentar ...
            </h1>
          </div>
        </div>
      )}

      <h1 className="text-headline text-center">masukan data acara</h1>

      {/* form */}
      <form
        className="w-[90%] md:w-[30%] mx-auto my-[30px] flex flex-col gap-[15px] bg-[white] px-[20px] py-[15px] rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label>nama</label>
          <input
            type="text"
            placeholder="nama"
            className="border-slate-500 rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem] focus:border-second focus:ring-0"
            onChange={(e) => {
              setDataAcara({
                ...dataAcara,
                nama: e.target.value,
              });
            }}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="tempat">tempat</label>
          <select
            id="tempat"
            className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
            onChange={(e) => {
              setDataAcara({
                ...dataAcara,
                tempat: e.target.value,
              });
            }}
            required
          >
            <option value="al-hikmah">al-hikmah</option>
            <option value="husnudzon billah">husnudzon billah</option>
            <option value="al-fatah">al-fatah</option>
            <option value="giri mekar">giri mekar</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-[15px] w-full overflow-hidden">
          <div className="flex flex-col w-full lg:w-1/3">
            <label htmlFor="waktu">waktu</label>
            <input
              id="waktu"
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              type="date"
              onChange={(e) => {
                setDataAcara({
                  ...dataAcara,
                  waktu: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-full lg:w-1/3">
            <label htmlFor="mulai">mulai</label>
            <input
              id="mulai"
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              type="time"
              onChange={(e) => {
                setDataAcara({
                  ...dataAcara,
                  mulai: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-full lg:w-1/3">
            <label htmlFor="selesai">selesai</label>
            <input
              id="selesai"
              type="time"
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              onChange={(e) => {
                setDataAcara({
                  ...dataAcara,
                  selesai: e.target.value,
                });
              }}
              required
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
