import mongoose, { Schema, Types, models } from "mongoose";

const laporanSchema = new Schema(
  {
    idAcara: {
      type: Types.ObjectId,
      ref: "Acara",
    },
    hadir: {
      type: Array,
    },
    izin: {
      type: Array,
    },
    bolos: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Laporan =
  models.Laporan || mongoose.model("Laporan", laporanSchema, "Laporan");
export default Laporan;
