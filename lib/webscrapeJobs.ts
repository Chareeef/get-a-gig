import axios from "axios";
import * as cheerio from "cheerio";
import { Job, jobCategory } from "@/types/jobs";

export async function getAllJobs(): Promise<Job[]> {
  const jobs: Job[] = [];
  const categories: jobCategory[] = [
    "full-stack-programming",
    "front-end-programming",
    "back-end-programming",
    "devops-sysadmin",
  ];

  // Get jobs from each category
  for (const category of categories) {
    const categoryJobs = await getJobsByCategory(category as jobCategory);
    categoryJobs.forEach((job) => {
      // Check if the job is already processed but has another category
      const jobWithSameUrlIndex = jobs.findIndex((processedJob) => {
        return (
          processedJob.url === job.url && processedJob.categories.length > 0
        );
      });
      if (jobWithSameUrlIndex !== -1) {
        jobs[jobWithSameUrlIndex].categories.push(category as jobCategory);
        return;
      } else {
        // Add the job
        jobs.push(job);
      }
    });
  }

  // Return the jobs
  return jobs;
}

export async function getJobsByCategory(category: jobCategory): Promise<Job[]> {
  // Make a GET request to the weworkremotely jobs page
  const url = `https://weworkremotely.com/categories/remote-${category}-jobs`;
  const response = await axios.get(url);
  const html = await response.data;

  // Parse the HTML content of the page
  const $ = cheerio.load(html);
  const jobs = $("li.feature").toArray();

  // Extract jobs infos
  const jobsInfo: Job[] = jobs.map((job) => {
    const url = $(job).find("> a").attr("href") || "";
    const title = $(job).find("span.title").text();
    const location = $(job)
      .find(".region")
      .text()
      .replace("Anywhere in the World", "Anywhere")
      .replace(/ Only/g, "")
      .replace(/\//g, ", ")
      .replace("Europe, EMEA", "Europe, Africa, Middle East")
      .replace("EMEA", "Europe, Africa, Middle East");
    const company = $(job).find("span.company:first-child").text();
    const daysSincePosted = parseInt(
      $(job).find(".listing-date__date").text().slice(0, -1),
    );
    // Select the div with the background image and extract the logo URL
    const logoUrl =
      $(job)
        .find(".flag-logo")
        .css("background-image")
        ?.replace(/url\((['"])?(.*?)\1\)/gi, "$2")
        .split(",")[0] || "";

    return {
      title,
      categories: [category],
      location,
      company,
      url,
      daysSincePosted,
      logoUrl,
      description: "",
      applyUrl: "",
    };
  });

  // Return the jobs infos
  return jobsInfo;
}

export async function getJobDetails(job: Job): Promise<Job> {
  // Make a GET request to the weworkremotely job's page
  const response = await axios.get(`https://weworkremotely.com${job.url}`);
  const html = await response.data;

  // Parse the HTML content of the page
  const $ = cheerio.load(html);

  // Extract job description and apply url
  job.description = $("section div#job-listing-show-container").html() || "";
  job.applyUrl = $("a#job-cta-alt").attr("href") || "";

  // Return the job
  return job;
}
