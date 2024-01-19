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
    waktu: {
      type: Date,
      required: true,
    },
    mulai: {
      type: String,
      required: true,
    },
    selesai: {
      type: String,
      reuired: true,
    },
  },
  { timestamps: true }
);

const Acara = models.Acara || mongoose.model("Acara", acaraSchema, "Acara");
export default Acara;
