import connectMongoDB from "@/libs/mongodb";
import Laporan from "@/models/laporan";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { idAcara } = await req.json();
  await connectMongoDB();
  try {
    const res = await Laporan.findOne({ idAcara });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
