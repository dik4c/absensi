import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nama, tempat, waktu, mulai, page, idAcara } = await req.json();
    await connectMongoDB();

    const itemPerPage = 8;
    const skip = (page - 1) * itemPerPage;

    if (
      nama === undefined &&
      tempat === undefined &&
      waktu === undefined &&
      mulai === undefined &&
      idAcara === undefined
    ) {
      const count = await Acara.countDocuments();
      const result = await Acara.find().skip(skip).limit(itemPerPage);
      return NextResponse.json({ result, count }, { mulai: 200 });
    }

    const matchQuery = {};
    if (nama !== undefined) matchQuery.nama = new RegExp(nama, "i");
    if (tempat !== undefined) matchQuery.tempat = tempat;
    if (waktu !== undefined) matchQuery.waktu = waktu;
    if (mulai !== undefined) matchQuery.mulai = mulai;
    if (idAcara !== undefined)
      matchQuery._id = new mongoose.Types.ObjectId(idAcara);

    const pipeline = [
      {
        $match: matchQuery,
      },
    ];

    const tmp = await Acara.aggregate(pipeline);
    const result = tmp.slice(skip, itemPerPage);
    const count = result.length;
    return NextResponse.json({ result, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
