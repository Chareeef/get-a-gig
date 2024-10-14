"use client";
import Image from "next/image";
import { useState } from "react";

export default function CompanyLogo({
  logoUrl,
  companyName,
  size,
}: {
  logoUrl: string;
  companyName: string;
  size: number;
}) {
  const [fallback, setFallback] = useState<boolean>(false);

  return (
    <>
      {fallback ? (
        <div
          className={`flex-center size-[${size}px] rounded-lg border-2 border-yellow-500 bg-white p-6 text-sm text-black`}
        >
          {companyName}
        </div>
      ) : (
        <Image
          src={logoUrl}
          className={`min-h-[${size}px] min-w-[${size}px] rounded-lg border-2 border-yellow-500 bg-white object-contain`}
          alt={companyName}
          onError={() => setFallback(true)}
          width={size}
          height={size}
        />
      )}
    </>
  );
}
