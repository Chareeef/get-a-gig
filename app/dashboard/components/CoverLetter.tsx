import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { Button } from "@/app/components/ui/button";
import ReactMarkdown from "react-markdown";

// Define the props for the component
interface CoverLetterProps {
  jobTitle: string;
  jobDescription: string;
}

export default function CoverLetter({
  jobTitle,
  jobDescription,
}: CoverLetterProps) {
  const { data: session } = useSession(); // Get session data
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [userBio, setUserBio] = useState<string | null>(null);

  // Fetch user bio
  async function fetchUserBio() {
    if (!user) {
      return;
    }
    try {
      const response = await fetch("/api/get_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      const { bio } = await response.json();
      if (bio) {
        setUserBio(bio);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data.");
    }
  }

  // Reset cover letter on job title or job description change
  useEffect(() => {
    setCoverLetter(null);
  }, [jobTitle, jobDescription]);

  // Fetch user bio on mount
  useEffect(() => {
    fetchUserBio();
  }, [user, userBio]);

  if (!user) {
    return null;
  }

  // Handle button click to generate the cover letter
  const handleGenerateCoverLetter = async () => {
    if (!userBio || !user.name) {
      toast.error("User bio or name is missing.");
      return;
    }

    setLoading(true);
    setCoverLetter(null);

    try {
      const response = await fetch("/api/generate_cover_letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          userName: user.name,
          userBio,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to generate cover letter. Please try again.");
        setLoading(false);
        return;
      }

      // Stream the response and handle chunks
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value);
        setCoverLetter(content); // Append content as it streams
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate cover letter. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative mb-2 flex min-h-12 w-full flex-col justify-around">
      <h2 className="mb-2 text-xl font-bold">Cover Letter</h2>
      <div className="border-2 border-gray-300 p-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {coverLetter ? (
              <ReactMarkdown className="text-left indent-2 first-letter:ml-2">
                {coverLetter}
              </ReactMarkdown>
            ) : (
              <div className="flex-center text-center">
                No cover letter generated yet.
              </div>
            )}
          </>
        )}
      </div>
      <Button
        variant={"ghost"}
        className="my-4 w-full self-center border-2 border-yellow-500 transition-transform duration-300 hover:scale-105 md:w-1/2"
        onClick={handleGenerateCoverLetter}
        disabled={loading || !userBio || !user.name}
      >
        {loading
          ? "Generating..."
          : `${coverLetter ? "Reg" : "G"}enerate Cover Letter`}
      </Button>
    </div>
  );
}
