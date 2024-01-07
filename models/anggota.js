import mongoose, { Schema, models } from "mongoose";

const anggotaSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    kelompok: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Anggota =
  models.Anggota || mongoose.model("Anggota", anggotaSchema, "Anggota");
export default Anggota;
