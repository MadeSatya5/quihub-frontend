import Link from "next/link";
import Typography from "../ui/Typography";
import { CircleUserRound, LogOut } from "lucide-react";

function Navbar() {
  return (
    <div className="border-t-2 border-main-black border-b-2 mt-5 flex">
      <div className="bg-main-black my-5 mx-5 py-3 px-10 rounded-full w-2/3 flex justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          <Typography variant="btn" className="text-white">
            QuiHub
          </Typography>
        </Link>

        <Link href="/" className="text-white text-lg font-semibold">
          <Typography variant="btn" className="text-white">
            List Soal
          </Typography>
        </Link>

        <Link href="/" className="text-white text-lg font-semibold">
          <Typography variant="btn" className="text-white">
            Leaderboard
          </Typography>
        </Link>

        <Link href="/" className="text-white text-lg font-semibold">
          <Typography variant="btn" className="text-white">
            Result
          </Typography>
        </Link>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-main-black my-5 mx-5 py-3 px-10 rounded-full w-fit flex justify-end">
        <Link href="/" className="text-white text-lg font-semibold flex gap-3">
        <CircleUserRound />
          <Typography variant="btn" className="text-white" weight="bold">
            Hi, Guest!
          </Typography>
        </Link>
      </div>

      {/* LOGOUT BUTTON */}
      <div className="bg-red-700 my-5 mx-5 py-3 px-10 rounded-full w-fit flex justify-end">
        <Link href="/" className="text-white text-lg font-semibold flex gap-3">
          <Typography variant="btn" className="text-white">
            LogOut
          </Typography>
          <LogOut />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
