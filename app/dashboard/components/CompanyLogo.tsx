"use client";
import Image from "next/image";
import { useState } from "react";

export default function CompanyLogo({
  logoUrl,
  companyName,
}: {
  logoUrl: string;
  companyName: string;
}) {
  const [fallback, setFallback] = useState<boolean>(false);

  return (
    <>
      {fallback ? (
        <div className="flex-center size-[50px] rounded-lg border-2 border-yellow-500 bg-white p-6 text-sm text-black">
          {companyName}
        </div>
      ) : (
        <Image
          src={logoUrl}
          className="min-h-[50px] min-w-[50px] rounded-lg border-2 border-yellow-500 bg-white object-contain"
          alt={companyName}
          onError={() => setFallback(true)}
          width={50}
          height={50}
        />
      )}
    </>
  );
}
