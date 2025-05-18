"use client";

import React from "react";
import PingLoaderEffect from "@/components/custom/loaders/PingLoaderEffect";
import useConcat from "@/hooks/use-concat";

type DataLoaderProps = {
  text?: string;
};

export default function DataLoader({ text }: DataLoaderProps) {
  const { loadingText } = useConcat({
    defaultText: text || "Carregando",
    concatText: ".",
  });

  return (
    <div className="flex items-center justify-center gap-1">
      <PingLoaderEffect />
      <p className="text-muted text-stone-600">{loadingText}</p>
    </div>
  );
}
