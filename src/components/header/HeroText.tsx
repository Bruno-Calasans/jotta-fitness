import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroText() {
  return (
    <div
      className={cn(
        "text-white flex flex-1 gap-3 justify-center rounded-md w-full flex-col lg:max-w-[1000px] md:max-w-[800px] mx-auto p-6"
      )}
    >
      <div>
        <p className="text-8xl text-orange-500 font-bold">Jotta Fitness</p>
        <p className="text-4xl font-bold">Saúde, Vida & Você</p>
        <p className="text-2xl font-bold">
          Conquiste o corpo que você sempre sonhou!
        </p>
      </div>
      <Link href="#our-plans" className="w-fit">
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 font-bold rounded-none w-fit"
        >
          Matrícule-se
        </Button>
      </Link>
    </div>
  );
}
