import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import Anggota from "@/models/anggota";
import Laporan from "@/models/laporan";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, tempat, waktu, mulai, selesai } = await req.json();
    await connectMongoDB();
    const res = await Acara.create({ nama, tempat, waktu, mulai, selesai });
    const tmp = await Anggota.find().select("_id");
    const arrayOfObjectIds = tmp.map((item) => item._id);

    await Laporan.create({
      idAcara: res._id,
      hadir: [],
      izin: [],
      bolos: arrayOfObjectIds,
    });
    console.log(res._id);
    return NextResponse.json(
      { msg: "berhasil menambah data anggota" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
