import connectMongoDB from "@/libs/mongodb";
import Anggota from "@/models/anggota";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();
    await connectMongoDB();
    await Anggota.deleteOne({ _id: id });
    return NextResponse.json(
      { msg: "berhasil menghapus data" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
