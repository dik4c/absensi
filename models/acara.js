import mongoose, { Schema, models } from "mongoose";

const acaraSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tempat: {
      type: String,
      required: true,
    },
    waktuMulai: {
      type: Date,
      required: true,
    },
    waktuSelesai: {
      type: Date,
      reuired: true,
    },
  },
  { timestamps: true }
);

const Acara = models.Acara || mongoose.model("Acara", acaraSchema, "Acara");
export default Acara;
