"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditPelajar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [dataAnggota, setDataAnggota] = useState({
    nama: "",
    kelompok: "al-hikmah",
    gender: "",
    status: "",
  });
  const idAnggota = searchParams.get("s");

  const getData = async () => {
    const res = await axios.post("/api/anggota/get", {
      idAnggota,
    });
    setDataAnggota(res.data.result[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/anggota/edit", {
        ...dataAnggota,
        idAnggota,
      });
      setLoading(false);
      if (res.status === 201) {
        router.replace("/pelajar");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(dataAnggota);
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
        <div className="flex flex-col">
          <label>nama</label>
          <input
            type="text"
            placeholder="nama"
            value={dataAnggota.nama}
            className="border-slate-500 rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem] focus:border-second focus:ring-0"
            onChange={(e) => {
              setDataAnggota({
                ...dataAnggota,
                nama: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-[15px]">
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="kelompok">kelompok</label>
            <select
              id="kelompok"
              value={dataAnggota.kelompok}
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              onChange={(e) => {
                setDataAnggota({
                  ...dataAnggota,
                  kelompok: e.target.value,
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
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="gender">gender</label>
            <select
              id="gender"
              value={dataAnggota.gender}
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              onChange={(e) => {
                setDataAnggota({
                  ...dataAnggota,
                  gender: e.target.value,
                });
              }}
              required
            >
              <option value="pria">pria</option>
              <option value="wanita">wanita</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="status">status</label>
            <select
              id="status"
              value={dataAnggota.status}
              className="block appearance-none w-full text-[.8em] border-opacity-50 border-slate-500 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:border-second"
              onChange={(e) => {
                setDataAnggota({
                  ...dataAnggota,
                  status: e.target.value,
                });
              }}
              required
            >
              <option value="pelajar">pelajar</option>
              <option value="mahasiswa">mahasiswa</option>
              <option value="usia nikah">usia nikah</option>
            </select>
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
