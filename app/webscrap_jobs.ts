import axios from "axios";
import * as cheerio from "cheerio";
import { job, jobCategory } from "../types";

export default async function getJobs(category: jobCategory): Promise<job[]> {
  const url = `https://weworkremotely.com/categories/remote-${category}-jobs#job-listings`;

  // Make a GET request to the weworkremotely jobs page
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
    return { title, category, location, company, url, date };
  });

  // Return the jobs infos
  return jobsInfo;
}
