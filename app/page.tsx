"use client";
import { CodeIcon, GlobeIcon, SearchIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { satoshi } from "./fonts/fonts";
import Image from "next/image";

export default function Home() {
  const teamMembers = [
    {
      name: "Abdelrahman Hany",
      role: "FrontEnd Developer",
      imageURL: "https://avatars.githubusercontent.com/u/130765990?v=4",
    },
    {
      name: "Youssef Charif",
      role: "Back-end Developer",
      imageURL: "https://avatars.githubusercontent.com/u/100241289?v=4",
    },
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        className={`${satoshi.className}  flex h-[500px] flex-col items-center justify-center gap-4 px-10 `}
      >
        <h1 className="text-center text-6xl font-bold">
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
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <SearchIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">Smart Job Matching</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our AI-powered system matches you with jobs that fit your
                  skills and preferences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <GlobeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">100% Remote Jobs</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  All jobs on our platform are fully remote, giving you the
                  freedom to work from anywhere.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-2 p-6">
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2 border-r border-gray-200 dark:border-gray-700 p-4">
              <div className="rounded-full bg-primary text-primary-foreground p-3 w-12 h-12 flex items-center justify-center">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Profile</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Sign up and showcase your skills, experience, and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-r border-gray-200 dark:border-gray-700 p-4">
              <div className="rounded-full bg-primary text-primary-foreground p-3 w-12 h-12 flex items-center justify-center">
                2
              </div>
              <h3 className="text-xl font-bold">Explore Opportunities</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Browse through our curated list of remote tech jobs.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="rounded-full bg-primary text-primary-foreground p-3 w-12 h-12 flex items-center justify-center">
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
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={member.imageURL}
                      alt={member.name}
                      width={460}
                      height={460}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
