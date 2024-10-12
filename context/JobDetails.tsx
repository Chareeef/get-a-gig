"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Job } from "@/types/jobs";
import { Dispatch, SetStateAction } from "react";

// Define the shape of the context
interface JobDetailsContextType {
  isDetailsOpen: boolean;
  setIsDetailsOpen: Dispatch<SetStateAction<boolean>>;
  selectedJob: Job | null;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
}

// Create the context
const JobDetailsContext = createContext<JobDetailsContextType | undefined>(
  undefined,
);

// Create a provider component
export const JobDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false); // State for details open
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // State for selected job

  return (
    <JobDetailsContext.Provider
      value={{ isDetailsOpen, setIsDetailsOpen, selectedJob, setSelectedJob }}
    >
      {children}
    </JobDetailsContext.Provider>
  );
};

// Custom hook to access the context
export const useJobDetails = () => {
  const context = useContext(JobDetailsContext);
  if (!context) {
    throw new Error("useJobDetails must be used within a JobDetailsProvider");
  }
  return context;
};
