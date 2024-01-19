import connectMongoDB from "@/libs/mongodb";
import Laporan from "@/models/laporan";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { type, idAnggota, idAcara } = await req.json();
  if (!["izin", "hadir", "bolos"].includes(type)) {
    return NextResponse.json({ err: "Invalid type" }, { status: 400 });
  }

  await connectMongoDB();
  try {
    let res = await Laporan.findOne({ idAcara });
    res.bolos = res.bolos.filter((i) => i.toString() !== idAnggota);
    res.izin = res.izin.filter((i) => i.toString() !== idAnggota);
    res.hadir = res.hadir.filter((i) => i.toString() !== idAnggota);
    res[type].push(idAnggota);

    console.log(type);
    console.log(res);

    await res.save();

    await Laporan.updateOne({ idAcara }, { res });
    return NextResponse.json("berhasil mengupdate data", { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
