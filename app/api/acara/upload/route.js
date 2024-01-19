import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, tempat, waktu, mulai, selesai } = await req.json();
    await connectMongoDB();
    await Acara.create({ nama, tempat, waktu, mulai, selesai });
    return NextResponse.json(
      { msg: "berhasil menambah data anggota" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
