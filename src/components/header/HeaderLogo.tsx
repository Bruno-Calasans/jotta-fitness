import Image from "next/image";

export default function HeaderLogo() {
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
