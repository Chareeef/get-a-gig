export type jobCategory =
  | "full-stack"
  | "front-end"
  | "back-end"
  | "devops-sysadmin";

export type job = {
  title: string;
  category: jobCategory;
  location: string;
  company: string;
  url: string;
  date: string;
};
