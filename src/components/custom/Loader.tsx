"use client";

import React from "react";
import PingLoaderEffect from "@/components/loaders/PingLoaderEffect";
import useConcat from "@/hooks/use-concat";

type LoaderProps = {
  text?: string;
};

export default function Loader({ text }: LoaderProps) {
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
