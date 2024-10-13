import { useJobDetails } from "@/context/JobDetails";
import CompanyLogo from "./CompanyLogo";
import { useEffect, useState } from "react";
import { getJobDetails } from "@/lib/webscrapeJobs";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loadingSpinner";
import "@/styles/jobDescription.css";
import CoverLetter from "./CoverLetter";

export default function JobView() {
  const {
    selectedJob: job,
    isDetailsOpen,
    setSelectedJob,
    setIsDetailsOpen,
  } = useJobDetails();
  const [description, setDescription] = useState<string>("");
  const [applyUrl, setApplyUrl] = useState<string>("");

  useEffect(() => {
    if (!job) {
      return;
    }

    (async () => {
      try {
        const updatedJob = await getJobDetails(job);
        setSelectedJob(updatedJob);
        setDescription(updatedJob.description);
        setApplyUrl(updatedJob.applyUrl);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get job details");
      }
    })();
  }, [job, setSelectedJob, isDetailsOpen, setIsDetailsOpen]);

  if (!job) {
    return null;
  }

  return (
    <div
      className={`${isDetailsOpen ? "visible" : "invisible"} flex-center fixed inset-0 h-dvh w-dvw bg-black/50 p-8`}
    >
      {/*  Modal */}
      <div className="relative flex max-h-[80dvh] w-full flex-col justify-evenly gap-4 overflow-y-auto rounded-lg bg-white px-2 py-4 text-center dark:bg-gray-800">
        {/* Company Logo */}
        <div className="flex-center">
          <CompanyLogo logoUrl={job.logoUrl} companyName={job.company} />
        </div>
        {/* Job General Infos */}
        <div className="grid grid-cols-2 rounded-sm border-2 border-gray-300">
          <div className="flex-center border-b-2 border-r-2 border-gray-300 p-2 text-lg font-bold">
            Title
          </div>
          <div className="flex-center border-b-2 border-gray-300 p-2 text-base font-bold">
            {job.title}
          </div>

          <div className="flex-center border-b-2 border-r-2 border-gray-300 p-2 text-lg font-bold">
            Company
          </div>
          <div className="flex-center border-b-2 border-gray-300 p-2 text-base font-bold">
            {job.company}
          </div>

          <div className="flex-center border-b-2 border-r-2 border-gray-300 p-2 text-lg font-bold">
            Location
          </div>
          <div className="flex-center border-b-2 border-gray-300 p-2 text-base font-bold">
            {job.location}
          </div>

          <div className="flex-center border-r-2 border-gray-300 p-2 text-lg font-bold">
            Posted
          </div>
          <div className="flex-center p-2 text-base font-bold">
            {job.daysSincePosted > 0 ? job.daysSincePosted : "1"} day
            {job.daysSincePosted > 1 ? "s" : ""} ago
          </div>
        </div>
        {description && applyUrl ? (
          <div className="flex flex-col space-y-2">
            {/* Job Description */}
            <div className="space-y-2 text-left">
              <p className="p-2 text-lg font-bold">Description:</p>
              <div
                className="text-pretty p-2 text-base"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </div>

            {/* Generate Cover Letter */}
            <CoverLetter
              jobTitle={job.title}
              jobDescription={job.description}
            />

            {/* Apply & Close Button */}
            <div className="mt-4 grid w-full grid-cols-2 gap-2 self-center md:w-1/2">
              <Button
                className="transition ease-in hover:-translate-y-1"
                asChild
              >
                <Link href={job.applyUrl} target="_blank">
                  Apply Now
                </Link>
              </Button>

              {/* Close Button */}
              <Button
                variant="destructive"
                className="transition duration-300 ease-in hover:-translate-y-1"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}

        {/* Close Button */}
        <button
          className="flex-center absolute right-2 top-2 size-4 rounded-full bg-red-500 p-3 text-sm text-white dark:bg-red-700"
          onClick={() => setIsDetailsOpen(false)}
        >
          X
        </button>
      </div>
    </div>
  );
}
