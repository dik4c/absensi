import connectMongoDB from "@/libs/mongodb";
import Anggota from "@/models/anggota";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, kelompok, gender, status, page, idAnggota } =
      await req.json();
    await connectMongoDB();

    const itemPerPage = 8;
    const skip = (page - 1) * itemPerPage;

    if (
      nama === undefined &&
      kelompok === undefined &&
      gender === undefined &&
      status === undefined &&
      idAnggota === undefined
    ) {
      const count = await Anggota.countDocuments();
      const result = await Anggota.find().skip(skip).limit(itemPerPage);
      return NextResponse.json({ result, count }, { status: 200 });
    }

    const matchQuery = {};
    if (nama !== undefined) matchQuery.nama = new RegExp(nama, "i");
    if (kelompok !== undefined) matchQuery.kelompok = kelompok;
    if (gender !== undefined) matchQuery.gender = gender;
    if (status !== undefined) matchQuery.status = status;
    if (idAnggota !== undefined)
      matchQuery._id = new mongoose.Types.ObjectId(idAnggota);

    const pipeline = [
      {
        $match: matchQuery,
      },
    ];

    const tmp = await Anggota.aggregate(pipeline);
    const result = tmp.slice(skip, itemPerPage);
    const count = result.length;
    return NextResponse.json({ result, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
