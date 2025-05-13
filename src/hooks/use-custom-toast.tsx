"use client";

import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function useCustomToast() {
  const { toast } = useToast();

  const errorToast = (title: string, description: string) => {
    toast({
      title: (
        <p className="text-white font-bold">{title}</p>
      ) as unknown as string,
      description: (
        <p className="text-white font-bold">{description}</p>
      ) as unknown as string,
      variant: "destructive",
    });
  };

  const successToast = (title: string, description: string) => {
    toast({
      title: (
        <p className="text-white font-bold">{title}</p>
      ) as unknown as string,
      description: (
        <p className="text-white font-bold">{description}</p>
      ) as unknown as string,
      className: "text-white bg-emerald-500 font-bold text-black",
    });
  };

  const infoToast = (title: string, description: string) => {
    toast({
      title: (
        <p className="text-white font-bold">{title}</p>
      ) as unknown as string,
      description: (
        <p className="text-white font-bold">{description}</p>
      ) as unknown as string,
      className: "bg-indigo200 font-bold text-black",
    });
  };

  return { errorToast, successToast, infoToast };
}
