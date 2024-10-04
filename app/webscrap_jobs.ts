import axios from "axios";
import * as cheerio from "cheerio";
import { job, jobCategory } from "../types";

export async function getJobs(category: jobCategory): Promise<job[]> {
  // Make a GET request to the weworkremotely jobs page
  const url = `https://weworkremotely.com/categories/remote-${category}-jobs#job-listings`;
  const response = await axios.get(url);
  const html = await response.data;

  // Parse the HTML content of the page
  const $ = cheerio.load(html);
  const jobs = $("li.feature").toArray();

  // Extract jobs infos
  const jobsInfo: job[] = jobs.map((job) => {
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
    const url = $(job).find("> a").attr("href") || "";
    const date = $(job).find(".listing-date__date").text();
    return {
      title,
      category,
      location,
      company,
      url,
      date,
      description: "",
      applyUrl: "",
    };
  });

  // Return the jobs infos
  return jobsInfo;
}

export async function getJobDetails(job: job): Promise<job> {
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
