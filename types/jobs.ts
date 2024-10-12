export type jobCategory =
  | "full-stack-programming"
  | "front-end-programming"
  | "back-end-programming"
  | "devops-sysadmin";

export interface Job {
  title: string;
  categories: jobCategory[];
  location: string;
  company: string;
  url: string;
  daysSincePosted: number;
  logoUrl: string;
  description: string;
  applyUrl: string;
}
