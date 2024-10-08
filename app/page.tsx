"use client";
import { useEffect } from "react";
import { CodeIcon, GlobeIcon, Pen } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { satoshi } from "./fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description:
        "Sign up and showcase your skills, experience, and preferences.",
    },
    {
      step: "2",
      title: "Explore Opportunities",
      description: "Browse through our curated list of remote tech jobs.",
    },
    {
      step: "3",
      title: "Apply and Connect",
      description: "Apply to jobs and connect directly with employers.",
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

  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200, once: true });
  }, []);

  return (
    <>
      {/* CTA Section */}
      <section
        className={`${satoshi.className} flex flex-col items-center justify-center gap-4 px-10 py-4`}
      >
        <h1 className="text-center text-6xl font-bold" data-aos="fade-up">
          Find Your Dream Remote Job in Tech
        </h1>
        <h2 className="text-center" data-aos="fade-up">
          Get-a-Gig connects ALX Software Engineering students with exciting
          remote job opportunities in the tech industry.
        </h2>
        <Button data-aos="zoom-in" size="lg">
          Get Started
        </Button>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full bg-gray-100 py-12 md:py-24 lg:py-32"
      >
        <div className="px-10 py-4">
          <h2
            className="mb-12 text-center text-3xl font-bold tracking-tighter text-black sm:text-5xl"
            data-aos="fade-up"
          >
            Features
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="md:w-[45%]"
                data-aos="flip-up"
              >
                <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                  <feature.icon className="size-12 text-primary" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-10 py-4">
          <h2
            className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl"
            data-aos="fade-up"
          >
            How It Works
          </h2>
          <div className="grid auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-3">
            {howItWorks.map((step) => (
              <Card
                key={step.title}
                className={`h-full ${step.step === "3" && "md:col-span-2 md:w-1/2 md:justify-self-center lg:col-span-1 lg:w-full"}`}
                data-aos="flip-down"
              >
                <CardContent className="flex h-full flex-col items-center justify-between space-y-2 p-6 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary p-3 text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="my-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section id="team" className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center">
          <h2
            className="mb-12 text-center text-3xl font-bold tracking-tighter text-black sm:text-5xl"
            data-aos="fade-up"
          >
            Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                data-aos={`flip-${index % 2 === 0 ? "left" : "right"}`}
              >
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="size-32 overflow-hidden rounded-full">
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
