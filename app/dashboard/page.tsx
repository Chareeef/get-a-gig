"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { satoshi } from "@/app/fonts/fonts";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("all");
  const jobCategories = [
    { name: "All", value: "all" },
    { name: "Full-Stack", value: "fullstack" },
    { name: "Frontend", value: "frontend" },
    { name: "Backend", value: "backend" },
    { name: "DevOps", value: "devops" },
  ];
  const [daysSincePosted, setDaysSincePosted] = useState<number>(7);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  if (status === "loading") {
    // Show a loading indicator
    return (
      <div className="flex-center grow bg-gray-100 dark:bg-slate-500">
        <span
          className={`${satoshi.className} animate-spin text-2xl font-black text-yellow-500 ease-in-out`}
        >
          @
        </span>
      </div>
    );
  }

  return (
    <main className="flex grow flex-col items-center bg-gray-100 p-4 dark:bg-slate-500">
      {/* Filters */}
      <div className="grid w-full gap-y-4 rounded-lg border-2 border-yellow-500 p-2">
        {/* Title Input */}
        <div className="grid w-full gap-y-2">
          <Label className="mb-2" htmlFor="title">
            Title
          </Label>
          <Input
            placeholder="Job Title"
            className="w-full"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>

        {/* Category Select */}
        <div className="grid w-full gap-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {jobCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Days Since Posted Input */}
        <div className="grid w-full gap-y-2">
          <Label htmlFor="daysSincePosted">Days Since Posted</Label>
          <Input
            placeholder="Days Since Posted"
            className="w-full"
            name="daysSincePosted"
            value={daysSincePosted}
            onChange={(e) => setDaysSincePosted(Number(e.target.value))}
            min={1}
            type="number"
          />
        </div>

        {/* Search Button */}
        <Button size="lg" className="w-full">
          Search
        </Button>
      </div>
    </main>
  );
}
