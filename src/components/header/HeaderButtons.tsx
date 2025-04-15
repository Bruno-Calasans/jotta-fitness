import Link from "next/link";
import { mainItems } from "./headerMenuData";
import { Button } from "../ui/button";

export default function HeaderButtons() {
  return (
    <div className="justify-center hidden gap-4 lg:flex">
      {mainItems.map((item) => (
        <Link key={item.title} href={item.url}>
          <Button
            variant="link"
            className="flex gap-1 items-center font-bold bg-transparent hover:bg-transparent text-white hover:text-orange-500 transition-all text-2xl p-0"
          >
            <p>{item.title}</p>
          </Button>
        </Link>
      ))}
    </div>
  );
}
