import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, tempat, waktu, mulai, selesai, idAcara } = await req.json();
    await connectMongoDB();
    await Acara.findOneAndUpdate(
      { _id: idAcara },
      { nama, tempat, waktu, mulai, selesai }
    );
    return NextResponse.json(
      { msg: "berhasil update data acara" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
