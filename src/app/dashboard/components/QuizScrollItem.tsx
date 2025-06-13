import Link from "next/link";
import Typography from "../../../components/ui/Typography";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type QuizScrollItemProps = {
  id: string;
  index: number;
  mata_kuliah: string;
  // src: string,
};

function QuizScrollItem({ id, index, mata_kuliah }: QuizScrollItemProps) {
  const router = useRouter();

  return (
    <div
      className="w-fit mx-3 mt-5 px-8 py-7 h-fit bg-main-black flex-shrink-0 rounded-[25px] transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => router.push(`/soal/${id}`)}
    >
      <div className="flex flex-col justify-center gap-8">
        <div className="flex items-center bg-main-white rounded-[30px] px-5 py-1 gap-4">
          <Typography
            variant="p"
            weight="bold"
            className="text-white text-center bg-main-black rounded-full w-10 h-10 flex items-center justify-center"
          >
            {index}
          </Typography>
          <Typography
            variant="p"
            weight="bold"
            className="text-black text-start w-[200px] "
          >
            {mata_kuliah}
          </Typography>
        </div>
        {/* <Typography
          variant="p"
          weight="bold"
          className="text-white text-center"
        >
          Loop, Conditional, and Function
        </Typography> */}
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
