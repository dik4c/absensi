import connectMongoDB from "@/libs/mongodb";
import Anggota from "@/models/anggota";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, kelompok, gender, status } = await req.json();
    await connectMongoDB();
    await Anggota.create({ nama, kelompok, gender, status });
    return NextResponse.json(
      { msg: "berhasil menambah data anggota" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
