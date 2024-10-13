"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { getAllJobs } from "@/lib/webscrapeJobs";
import { Job } from "@/types/jobs";
import { toast } from "sonner";
import JobsFilters from "@/app/dashboard/components/JobsFilters";
import JobsList from "@/app/dashboard/components/JobsList";
import JobView from "./components/JobView";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to login if not authenticated
    } else if (status === "authenticated") {
      // Fetch jobs
      (async () => {
        try {
          const jobs = await getAllJobs();

          // Sort jobs by most recent
          jobs.sort((a, b) => a.daysSincePosted - b.daysSincePosted);

          // Set the jobs
          setJobs(jobs);
          setFilteredJobs(jobs);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch jobs");
        } finally {
          setLoadingJobs(false);
        }
      })();
    }
  }, [session, status, router]);

  if (status === "loading") {
    // Show a loading indicator
    return (
      <div className="flex-center h-[60dvh] grow bg-gray-100 dark:bg-slate-500">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="flex grow flex-col items-center gap-y-4 bg-gray-100 p-4 dark:bg-slate-500">
      {/* Filters */}
      <JobsFilters
        jobs={jobs}
        setFilteredJobs={setFilteredJobs}
        setLoadingJobs={setLoadingJobs}
      />

      {/* Jobs List */}
      <div className="w-full">
        {loadingJobs ? (
          <div className="flex-center grow">
            <LoadingSpinner />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex-center grow">No Jobs Found</div>
        ) : (
          <JobsList jobs={filteredJobs} />
        )}
      </div>

      {/* Job Details */}
      <JobView />
    </main>
  );
}
