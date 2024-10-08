"use client";
import { CodeIcon, GlobeIcon, SearchIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { satoshi } from "./fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaX } from "react-icons/fa";

export default function Home() {
  const teamMembers = [
    {
      name: "Abdelrahman Hany",
      imageURL: "https://avatars.githubusercontent.com/u/130765990?v=4",
      githubURL: "https://github.com/AbduHany",
      linkedinURL: "https://linkedin.com/in/abduhany",
      xURL: "https://x.com/AbduuHany",
    },
    {
      name: "Youssef Charif Hamidi",
      imageURL: "https://avatars.githubusercontent.com/u/100241289?v=4",
      githubURL: "https://github.com/Chareeef",
      linkedinURL: "https://linkedin.com/in/youssef-charif-hamidi",
      xURL: "https://x.com/YoussefCharifH2",
    },
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        className={`${satoshi.className}  flex h-[500px] flex-col items-center justify-center gap-4 px-10 `}
      >
        <h1 className="text-6xl font-bold text-center">
          Find Your Dream Remote Job in Tech
        </h1>
        <h2 className="text-center">
          Get-a-Gig connects ALX Software Engineering students with exciting
          remote job opportunities in the tech industry.
        </h2>
        <Button size="lg">Get Started</Button>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full py-12 bg-gray-100 md:py-24 lg:py-32 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-2">
                <SearchIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">Smart Job Matching</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our AI-powered system matches you with jobs that fit your
                  skills and preferences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-2">
                <GlobeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">100% Remote Jobs</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  All jobs on our platform are fully remote, giving you the
                  freedom to work from anywhere.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-2">
                <CodeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">Tech-Focused</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Curated job listings specifically for software engineers and
                  tech professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-4 border-r border-gray-200 space-y-2 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Profile</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Sign up and showcase your skills, experience, and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 border-r border-gray-200 space-y-2 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Explore Opportunities</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Browse through our curated list of remote tech jobs.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 space-y-2">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Apply and Connect</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Apply to jobs and connect directly with employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section
        id="team"
        className="w-full py-12 bg-gray-100 md:py-24 lg:py-32 dark:bg-gray-800"
      >
        <div className="flex flex-col items-center">
          <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 space-y-4">
                  <div className="w-32 h-32 overflow-hidden rounded-full">
                    <Image
                      src={member.imageURL}
                      alt={member.name}
                      width={460}
                      height={460}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <div className="flex space-x-4">
                    <Link
                      href={member.xURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        𝕏
                      </span>
                    </Link>
                    <Link
                      href={member.linkedinURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      href={member.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
