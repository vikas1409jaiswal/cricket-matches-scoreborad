import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
  baseURL: "http://localhost:3040/v1/",
});

export const useBestTitle = (
  matchTitle: string,
  team1: string,
  team2: string
) => {
  const [bestTitle, setBestTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBestTitle = async () => {
    setLoading(true);
    setError(null);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Generate the best YouTube video title for a cricket match between ${team1} and ${team2} with the title "${matchTitle}"`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log(completion as any);
      const generatedTitle = completion.choices[0]?.message.content;
      setBestTitle(generatedTitle || "");
    } catch (err) {
      console.error("Error fetching the best title:", err);
      setError("Failed to fetch the best title.");
    } finally {
      setLoading(false);
    }
  };

  return { bestTitle, fetchBestTitle, loading, error };
};
