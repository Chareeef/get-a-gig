import { satoshi } from "@/app/fonts/fonts";

export default function LoadingSpinner() {
  return (
    <div className="flex-center grow">
      <span
        className={`${satoshi.className} animate-spin text-2xl font-black text-yellow-500 ease-in-out`}
      >
        @
      </span>
    </div>
  );
}
