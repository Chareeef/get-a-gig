"use client";
import { CodeIcon, GlobeIcon, Pen } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { satoshi } from "./fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      title: "100% Remote Jobs",
      description:
        "All jobs on our platform are fully remote, giving you the freedom to work from anywhere.",
      icon: GlobeIcon,
    },
    {
      title: "Tech-Focused",
      description:
        "Curated job listings specifically for software engineers and tech professionals.",
      icon: CodeIcon,
    },
    {
      title: "Cover Letter Generator",
      description:
        "Our platform allows you to generate a cover letter for any job you apply for.",
      icon: Pen,
    },
  ];
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
        className={`${satoshi.className}  flex flex-col items-center justify-center gap-4 px-10 py-4`}
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
        <div className="px-10 py-4">
          <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center text-black sm:text-5xl">
            Features
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="md:w-[45%]">
                <CardContent className="flex flex-col items-center p-6 text-center space-y-2">
                  <feature.icon className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-10 py-4">
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
