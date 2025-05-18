import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFoundPage() {
  const headersList = await headers();
  const referer = headersList.get("referer");
  const requestFromDashboard =
    referer && referer.toLowerCase().includes("dashboard");

  return (
    <div className="text-white flex justify-center items-center mt-20 flex-col gap-2">
      <div className="flex flex-col items-center">
        <p className="text-4xl font-bold">Erro 404: Página não encontrada</p>
        <p className="text-muted">
          Desculpa, mas não conseguimos encontrar o que você procura.
        </p>
      </div>
      <Link href={requestFromDashboard ? "/dashboard" : "/"}>
        <Button className="bg-orange-500 hover:bg-orange-600 font-bold transition-all">
          <ChevronLeft />
          {requestFromDashboard
            ? "Ir para Dashboard"
            : "Ir para Página Inicial"}
        </Button>
      </Link>
    </div>
  );
}
