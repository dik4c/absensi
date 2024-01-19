import connectMongoDB from "@/libs/mongodb";
import Anggota from "@/models/anggota";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, kelompok, gender, status, idAnggota } = await req.json();
    await connectMongoDB();
    await Anggota.findOneAndUpdate(
      { _id: idAnggota },
      { nama, kelompok, gender, status }
    );
    return NextResponse.json(
      { msg: "berhasil update data anggota" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
