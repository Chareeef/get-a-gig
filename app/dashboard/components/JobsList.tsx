import { job } from "@/types/jobs";

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
      className="w-full break-words rounded-sm border-2 border-yellow-500 bg-gray-200 p-4"
    >
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-base">
        Categories:{" "}
        {job.categories.map((category, index) => (
          <span
            key={index}
            className={`${categories[category as keyof typeof categories].color} mx-1 rounded-md px-2 py-1 text-white`}
          >
            {categories[category as keyof typeof categories].name}
          </span>
        ))}
      </p>
      <p className="text-base">Company: {job.company}</p>
      <p className="text-base">Location: {job.location}</p>
      <p className="text-base">Posted {job.daysSincePosted} days ago</p>
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
