"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Delete({ type, uid }) {
  const router = useRouter();
  console.log(uid);
  const handleDelete = async () => {
    try {
      const res = await axios.post(`/api/${type}/delete`, { id: uid });
      if (res.status === 201) {
        router.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full fixed backdrop-blur-sm bg-white/30 z-40 inset-0">
      <div className="fixed w-[90%] md:w-[50%] bg-white rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50">
        <div className="py-[50px]">
          <h1 className="text-black font-montserrat-bold text-[1em] text-center">
            apakah anda yakin ?
          </h1>
          <div className="flex gap-[10px] justify-center py-[10px]">
            <button className="btn">tidak</button>
            <button className="btn !bg-red-500" onClick={handleDelete}>
              yakin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
