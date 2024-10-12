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
        <div className="flex-center rounded-lg border-2 border-yellow-500 bg-white p-6">
          {companyName}
        </div>
      ) : (
        <Image
          src={logoUrl}
          className="rounded-lg border-2 border-yellow-500"
          alt={companyName}
          onError={() => setFallback(true)}
          width={120}
          height={120}
        />
      )}
    </>
  );
}
