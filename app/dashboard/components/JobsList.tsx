"use client";
import { useJobDetails } from "@/context/JobDetails";
import { Button } from "@/app/components/ui/button";
import { Job } from "@/types/jobs";
import CompanyLogo from "./CompanyLogo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

function JobCard({ job }: { job: Job }) {
  const { setIsDetailsOpen, setSelectedJob } = useJobDetails();
  const categories = {
    ["full-stack-programming"]: { name: "Full-Stack", color: "bg-red-500" },
    ["front-end-programming"]: { name: "Frontend", color: "bg-blue-500" },
    ["back-end-programming"]: { name: "Backend", color: "bg-green-500" },
    ["devops-sysadmin"]: { name: "DevOps", color: "bg-yellow-500" },
  };

  function openJobView() {
    setIsDetailsOpen(true);
    setSelectedJob(job);
  }
  console.log(job);

  return (
    <div key={job.url}>
      <Card className="flex h-full flex-col justify-between bg-gray-200 dark:bg-gray-800">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center justify-between">
            <CompanyLogo logoUrl={job.logoUrl} companyName={job.company} />
            <p>{job.company}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-4 px-4">
          <p className="text-lg font-bold">{job.title}</p>
          <p>
            <span className="font-bold">Location: </span>
            {job.location}
          </p>
          <p>
            <span className="font-bold">Posted: </span>
            {job.daysSincePosted >= 1 ? job.daysSincePosted : 1} day
            {job.daysSincePosted > 1 ? "s" : ""} ago
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-4 pb-4">
          <div>
            <Badge variant="outline" className="border-black dark:border-white">
              {categories[job.categories[0]].name}
            </Badge>
          </div>
          <Button size="sm" onClick={openJobView}>
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
    // <div
    //   key={job.url}
    //   className="w-full divide-y-2 divide-gray-300 rounded-sm border-2 border-yellow-500 bg-gray-200 text-center dark:bg-gray-800 dark:text-white"
    // >
    //   <div className="flex-center p-3">
    //     <CompanyLogo logoUrl={job.logoUrl} companyName={job.company} />
    //   </div>

    //   <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
    //     <div className="flex-center text-lg font-bold">Title</div>
    //     <div className="flex-center p-2 text-base font-bold">{job.title}</div>
    //   </div>

    //   <div className="grid grid-cols-2 divide-x-2 divide-gray-300">
    //     <div className="flex-center text-lg font-bold">Category</div>
    //     <div className="flex-center p-2 text-base font-bold">
    //       <span
    //         className={`${categories[job.categories[0]].color} rounded px-2 py-1`}
    //       >
    //         {categories[job.categories[0]].name}
    //       </span>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
    //     <div className="flex-center text-lg font-bold">Company</div>
    //     <div className="flex-center p-2 text-base font-medium italic">
    //       {job.company}
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-2 divide-x-2 divide-gray-300 break-all">
    //     <div className="flex-center text-lg font-bold">Location</div>
    //     <div className="flex-center p-2 text-base font-medium italic">
    //       {job.location}
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-2 divide-x-2 divide-gray-300">
    //     <div className="flex-center text-lg font-bold">Posted</div>
    //     <div className="flex-center p-2 text-base font-medium italic">
    //       {job.daysSincePosted >= 1 ? job.daysSincePosted : 1} day
    //       {job.daysSincePosted > 1 ? "s" : ""} ago
    //     </div>
    //   </div>

    //   <div className="flex-center p-3">
    //     <Button onClick={openJobView}>View Details</Button>
    //   </div>
    // </div>
  );
}

export default function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{jobs.length} Jobs Found</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </>
  );
}
