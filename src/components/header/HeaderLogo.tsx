import Image from "next/image";

type HeaderLogoProps = {};

export default function HeaderLogo({}: HeaderLogoProps) {
  return (
    <div className="h-20 w-36 rounded-md relative">
      <Image
        fill
        priority
        src="/imgs/logos/logo-1.png"
        alt="jotta fitness logo"
        className="aspect-square rounded-sm"
      />
    </div>
  );
}
