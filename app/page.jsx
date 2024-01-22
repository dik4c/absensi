"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./component/loading";
import DonatChart from "./component/DonatChart";
import Link from "next/link";

export default function Dashboard() {
  const [acara, setAcara] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    const res = await axios.get("/api/acara/check");
    setAcara(res.data.result);
    setLoading(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="pb-[50px]">
      <h1 className="text-headline pb-[50px]">Dashboard</h1>

      <h2 className="font-poppins-bold text-[.7em] pb-[20px]">
        Acara hari ini :
      </h2>
      {acara[0] === undefined ? (
        <div className="text-center py-[50px] font-robotomono-medium opacity-70">
          <img src="/unavailable.svg" className="mx-auto w-[30%]" alt="" />
          <p>tidak ada acara hari ini</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-[15px]">
          {acara.map((i, idx) => {
            const { hadirDetails, izin, bolos } = i.kehadiran;
            const chartData = {
              labels: [
                "al-hikmah",
                "husnudzon billah",
                "al-fatah",
                "giri mekar",
                "tidak hadir",
              ],
              datasets: [
                {
                  label: "kehadiran",
                  data: [
                    hadirDetails.alHikmah,
                    hadirDetails.husbil,
                    hadirDetails.jatiUtama,
                    hadirDetails.giriMekar,
                    bolos,
                  ],
                  backgroundColor: [
                    "#1D2B53",
                    "#7E2553",
                    "#FF004D",
                    "#FAEF5D",
                    "#393939",
                  ],
                  hoverBackgroundColor: ["white"],
                  borderWidth: 1,
                },
              ],
            };

            return (
              <div
                className="w-full md:w-[30%] md:mx-0 py-[15px] px-[10px] border-[1px] border-slate-800 border-opacity-50 rounded-[5px]"
                key={idx}
              >
                {/* header */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-[10px] items-center">
                    <div>
                      <img
                        src="/logo.jpg"
                        alt="logo"
                        className="w-[30px] rounded-full border-2 border-gray-800"
                      />
                    </div>
                    <div>
                      <h2 className="font-poppins-bold text-[.8em]">
                        {i.nama}
                      </h2>
                      <p>{i.tempat}</p>
                    </div>
                  </div>
                  <img src="/option.svg" className="w-[20px]" alt="" />
                </div>

                <div className="w-full mx-auto">
                  <DonatChart data={chartData} />
                </div>

                <div className="flex justify-between items-end">
                  <p>start : {i.mulai}</p>
                  <Link href={`/absen?s=${i._id}`} className="btn">
                    absen
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* container main */}
    </div>
  );
}
