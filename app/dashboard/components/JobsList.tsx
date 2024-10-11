"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { job } from "@/types/jobs";
import Image from "next/image";

function CompanyLogo({
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
function JobCard({ job }: { job: job }) {
  const categories = {
    ["full-stack-programming"]: { name: "Full-Stack", color: "bg-red-500" },
    ["front-end-programming"]: { name: "Frontend", color: "bg-blue-500" },
    ["back-end-programming"]: { name: "Backend", color: "bg-green-500" },
    ["devops-sysadmin"]: { name: "DevOps", color: "bg-yellow-500" },
  };

  return (
    <div
      key={job.url}
      className="w-full divide-y-2 divide-gray-300 rounded-sm border-2 border-yellow-500 bg-gray-200 text-center"
    >
      <div className="flex-center p-3">
        <CompanyLogo logoUrl={job.logoUrl} companyName={job.company} />
      </div>

      <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
        <div className="flex-center text-lg font-bold">Title</div>
        <div className="flex-center p-2 text-base font-bold">{job.title}</div>
      </div>

      <div className="grid grid-cols-2 divide-x-2 divide-gray-300">
        <div className="flex-center text-lg font-bold">Category</div>
        <div className="flex-center p-2 text-base font-bold">
          <span
            className={`${categories[job.categories[0]].color} rounded px-2 py-1`}
          >
            {categories[job.categories[0]].name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
        <div className="flex-center text-lg font-bold">Company</div>
        <div className="flex-center p-2 text-base font-medium italic">
          {job.company}
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
        <div className="flex-center text-lg font-bold">Location</div>
        <div className="flex-center p-2 text-base font-medium italic">
          {job.location}
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x-2 divide-gray-300">
        <div className="flex-center text-lg font-bold">Posted</div>
        <div className="flex-center p-2 text-base font-medium italic">
          {job.daysSincePosted >= 1 ? job.daysSincePosted : 1} day
          {job.daysSincePosted > 1 ? "s" : ""} ago
        </div>
      </div>

      <div className="flex-center p-3">
        <Button>View Details</Button>
      </div>
    </div>
  );
}

export default function JobsList({ jobs }: { jobs: job[] }) {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{jobs.length} Jobs Found</h1>
      <div className="w-full space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </>
  );
}
