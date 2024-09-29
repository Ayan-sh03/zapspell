"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  first_name: string;
  last_name: string;
  combined_score: number;
  total_attempts: number;
  correct_spellings: number;
  success_percentage: number;
}

const leaderboardData = [
  {
    rank: 1,
    name: "Alex Johnson",
    score: 9850,
    totalAttempts: 120,
    correctAttempts: 118,
  },
  {
    rank: 2,
    name: "Sam Smith",
    score: 9720,
    totalAttempts: 115,
    correctAttempts: 114,
  },
  {
    rank: 3,
    name: "Taylor Swift",
    score: 9680,
    totalAttempts: 110,
    correctAttempts: 109,
  },
  {
    rank: 4,
    name: "Chris Evans",
    score: 9550,
    totalAttempts: 105,
    correctAttempts: 103,
  },
  {
    rank: 5,
    name: "Emma Watson",
    score: 9490,
    totalAttempts: 100,
    correctAttempts: 98,
  },
  {
    rank: 6,
    name: "Tom Holland",
    score: 9420,
    totalAttempts: 95,
    correctAttempts: 93,
  },
  {
    rank: 7,
    name: "Zendaya",
    score: 9380,
    totalAttempts: 90,
    correctAttempts: 88,
  },
  {
    rank: 8,
    name: "Robert Downey Jr.",
    score: 9340,
    totalAttempts: 85,
    correctAttempts: 83,
  },
  {
    rank: 9,
    name: "Scarlett Johansson",
    score: 9290,
    totalAttempts: 80,
    correctAttempts: 78,
  },
  {
    rank: 10,
    name: "Chris Hemsworth",
    score: 9250,
    totalAttempts: 75,
    correctAttempts: 73,
  },
];

export default function LeaderboardPage() {
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);
  const [Leaderboard, setLeaderBoard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`api/leaderboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { data } = await response.json();
        console.log(data);
        setLeaderBoard(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C3E50] to-[#34495E] text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-[#E74C3C]"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
          </svg>
          <h1 className="text-3xl font-bold tracking-tight">
            ZapSpell Leaderboard
          </h1>
        </div>
        <Link href={"/test"}>
          <button className="bg-[#3e5a9f] hover:bg-[#1d4c5e] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#403890] focus:ring-opacity-50">
            Back to Practice
          </button>
        </Link>
      </header>
      <Card className="bg-[#2C3E50] border-none shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] py-6">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Top Spellers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <TooltipProvider>
              {Leaderboard.map((entry, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        index % 2 === 0 ? "bg-[#34495E]" : "bg-[#2C3E50]"
                      } hover:bg-[#3498DB] hover:shadow-lg transform hover:-translate-y-1`}
                      onMouseEnter={() => setHoveredRank(index)}
                      onMouseLeave={() => setHoveredRank(null)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E74C3C] text-white font-bold text-lg">
                          {(index+1) <= 3 ? (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            index+1
                          )}
                        </div>
                        <span className="font-semibold text-lg">
                          {entry.first_name} {entry.last_name}
                        </span>
                      </div>
                      <span className="text-2xl font-bold">
                        {entry.combined_score.toLocaleString()}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#34495E] text-white p-2 rounded-lg shadow-lg"
                  >
                    <p>Total Attempts: {entry.total_attempts}</p>
                    <p>Correct Attempts: {entry.correct_spellings}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
