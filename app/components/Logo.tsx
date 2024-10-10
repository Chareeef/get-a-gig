import { satoshi } from "../fonts/fonts";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="grow">
      <Link href="/" className={`${satoshi.className} text-xl font-black`}>
        GET
        <br />
        <span className="text-yellow-400">@</span> GIG
      </Link>
    </div>
  );
}
