import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import { NextResponse } from "next/server";
import moment from "moment-timezone";

export async function GET() {
  await connectMongoDB();
  try {
    const today = moment(new Date()).tz("Asia/Jakarta").toDate();
    today.setHours(0, 0, 0, 0);

    const result = await Acara.find({
      waktu: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
