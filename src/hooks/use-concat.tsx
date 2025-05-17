import { useEffect, useState } from "react";

type UseConcatProps = {
  defaultText: string;
  concatText?: string;
  concatTextAmountBeforeReset?: number;
  intervalTime?: number;
};

export default function useConcat({
  defaultText,
  concatText,
  concatTextAmountBeforeReset,
  intervalTime,
}: UseConcatProps) {
  const [loadingText, setLoadingText] = useState(defaultText);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setLoadingText((curr) => {
        if (
          curr.endsWith(
            concatTextAmountBeforeReset && concatText
              ? concatText.repeat(concatTextAmountBeforeReset)
              : "...",
          )
        )
          return defaultText;
        return curr.concat(concatText || ".");
      });
    }, intervalTime || 600);

    return () => clearInterval(timeOut);
  }, []);

  return { loadingText };
}
