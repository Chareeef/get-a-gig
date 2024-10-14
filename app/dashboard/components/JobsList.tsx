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
