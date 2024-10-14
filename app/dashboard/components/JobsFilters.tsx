import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";
import { Job } from "@/types/jobs";
import { Dispatch, SetStateAction } from "react";

interface FilterProps {
  jobs: Job[];
  setFilteredJobs: Dispatch<SetStateAction<Job[]>>;
  loadingJobs: boolean;
  setLoadingJobs: Dispatch<SetStateAction<boolean>>;
}

export default function JobFilters({
  jobs,
  setFilteredJobs,
  loadingJobs,
  setLoadingJobs,
}: FilterProps) {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [daysSincePosted, setDaysSincePosted] = useState<number>(0);
  const jobCategories = [
    { name: "All", value: "all" },
    { name: "Full-Stack", value: "full-stack-programming" },
    { name: "Frontend", value: "front-end-programming" },
    { name: "Backend", value: "back-end-programming" },
    { name: "DevOps", value: "devops-sysadmin" },
  ];

  function filterJobs() {
    // Start loading jobs state
    setLoadingJobs(true);

    // Filter jobs
    const filtered = jobs.filter((job) => {
      // Eliminates jobs with unmatching category
      if (category !== "all" && job.category !== category) {
        return false;
      }

      // Eliminates jobs with unmatching title
      if (title && !job.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      // Eliminates jobs with too old days since posted
      if (daysSincePosted && job.daysSincePosted > daysSincePosted) {
        return false;
      }

      // If all checks pass, return the job
      return true;
    });

    // Sort jobs by most recent
    filtered.sort((a, b) => a.daysSincePosted - b.daysSincePosted);

    // Set the filtered jobs
    setFilteredJobs(filtered);

    // Stop loading jobs
    setLoadingJobs(false);
  }

  return (
    <div className="grid w-full gap-y-4 rounded-lg border-2 border-yellow-500 p-2">
      {/* Title Input */}
      <div className="grid w-full gap-y-2">
        <Label className="mb-2" htmlFor="title">
          Title
        </Label>
        <Input
          placeholder="Job Title"
          className="w-full"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>

      {/* Category Select */}
      <div className="grid w-full gap-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {jobCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Days Since Posted Input */}
      <div className="grid w-full gap-y-2">
        <Label htmlFor="daysSincePosted">Days Since Posted</Label>
        <Input
          placeholder="Maximum days since posted"
          className="w-full"
          name="daysSincePosted"
          value={daysSincePosted || ""}
          onChange={(e) => setDaysSincePosted(Number(e.target.value))}
          min={1}
          max={30}
          type="number"
        />
      </div>

      {/* Search Button */}
      <Button
        size="lg"
        className={`w-full hover:bg-yellow-500 ${loadingJobs && "bg-yellow-300"}`}
        onClick={filterJobs}
      >
        {loadingJobs ? "Loading..." : "Search"}
      </Button>
    </div>
  );
}
