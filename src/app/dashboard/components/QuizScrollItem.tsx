import Link from "next/link";
import Typography from "../../../components/ui/Typography";
import { ChevronRight, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

type QuizScrollItemProps = {
  id: string;
  index: number;
  mata_kuliah: string;
  src?: string;
};

function QuizScrollItem({ id, index, mata_kuliah, src }: QuizScrollItemProps) {
  const router = useRouter();

  return (
    <div
      className="relative w-fit mx-3 mt-5 px-8 py-7 h-fit flex-shrink-0 rounded-[25px] transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
      style={{
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: !src ? "#0D0D0D" : undefined,
      }}
      onClick={() => router.push(`/soal/${id}`)}
    >
      {/* Backdrop gelap transparan */}
      <div className="absolute inset-0 bg-black/60  rounded-[25px]" />

      <div className="relative z-10 flex flex-col justify-center gap-8">
        {/* Header */}
        <div className="flex items-center bg-white/80 rounded-[30px] px-5 py-1 gap-4">
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
            className="text-black text-start w-[200px]"
          >
            {mata_kuliah}
          </Typography>
        </div>

        {/* Durasi */}
        <div className="flex items-center justify-center gap-2 text-white">
          <Timer />
          <Typography variant="p" weight="bold" className="text-white">
            15 Menit
          </Typography>
        </div>

        {/* Tombol */}
        <Link
          href={`/soal/${id}`}
          className="bg-white/90  rounded-[20px] flex items-center justify-center w-3/4 mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant="btn"
            className="text-black bg-main-blue px-4 py-2 rounded-lg text-center"
            weight="semibold"
          >
            Kerjakan Sekarang
          </Typography>
          <ChevronRight className="text-black" />
        </Link>
      </div>
    </div>
  );
}

export default QuizScrollItem;
