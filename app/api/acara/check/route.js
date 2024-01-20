import connectMongoDB from "@/libs/mongodb";
import Acara from "@/models/acara";
import { NextResponse } from "next/server";
import moment from "moment-timezone";
import Anggota from "@/models/anggota";

export async function GET() {
  await connectMongoDB();
  try {
    const today = moment(new Date()).tz("Asia/Jakarta").toDate();
    today.setHours(0, 0, 0, 0);

    const pipeline = [
      {
        $match: {
          waktu: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },

      {
        $lookup: {
          from: "Laporan",
          localField: "_id",
          foreignField: "idAcara",
          as: "kehadiran",
        },
      },

      // {
      //   $project: {
      //     agent: 1,
      //     status: 1,
      //     ability: 1,
      //     map: 1,
      //     coordinat: 1,
      //     judul: 1,
      //     keterangan: 1,
      //     tag: 1,
      //     imgAndDes: 1,
      //     linkVideo: 1,
      //     idMaker: 1,
      //     like: 1,
      //     userInfo: { username: 1, pp: 1 },
      //     createdAt: 1,
      //     updatedAt: 1,
      //   },
      // },
    ];
    const result = await Acara.aggregate(pipeline);

    const tmp = await Promise.all(
      result.map(async (i) => {
        const hadirCount = await Anggota.find({
          _id: { $in: i.kehadiran[0].hadir },
        }).select("kelompok");

        const hadirDetails = {
          alHikmah: 0,
          husbil: 0,
          jatiUtama: 0,
          giriMekar: 0,
        };

        hadirCount.forEach((item) => {
          if (item.kelompok === "al-hikmah") {
            hadirDetails.alHikmah++;
          }
          if (item.kelompok === "husnudzon billah") {
            hadirDetails.husbil++;
          }
          if (item.kelompok === "al-fatah") {
            hadirDetails.jatiUtama++;
          }
          if (item.kelompok === "giri mekar") {
            hadirDetails.giriMekar++;
          }
        });

        return {
          ...i,
          kehadiran: {
            hadirDetails,
            bolos: i.kehadiran[0].bolos.length,
            izin: i.kehadiran[0].izin.length,
          },
        };
      })
    );

    return NextResponse.json({ result: tmp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
