import Link from "next/link";
import Typography from "./Typography";
import { ChevronRight } from "lucide-react";

function QuizScrollItem() {
  return (
    <div className="w-fit px-8 py-7 h-fit bg-main-black flex-shrink-0 rounded-[25px]">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex items-center bg-main-white rounded-[30px] px-5 py-1 gap-4">
          <Typography
            variant="p"
            weight="bold"
            className="text-white text-center bg-main-black rounded-full w-10 h-10 flex items-center justify-center"
          >
            1.
          </Typography>
          <Typography
            variant="p"
            weight="bold"
            className="text-black text-center  "
          >
            Dasar Pemrograman
          </Typography>
        </div>
        <Typography
          variant="p"
          weight="bold"
          className="text-white text-center"
        >
          Loop, Conditional, and Function
        </Typography>
        <Typography
          variant="p"
          weight="bold"
          className="text-white text-center"
        >
          20 Soal | 20 Menit
        </Typography>

        <Link
          href="/"
          className="bg-main-white rounded-[20px] flex items-center justify-center w-3/4 mx-auto"
        >
          <Typography
            variant="btn"
            className="text-black bg-main-blue px-4 py-2 rounded-lg text-center"
            weight="semibold"
          >
            Mulai Sekarang
          </Typography>
          <ChevronRight className="text-black" />
        </Link>
      </div>
    </div>
  );
}

export default QuizScrollItem;
