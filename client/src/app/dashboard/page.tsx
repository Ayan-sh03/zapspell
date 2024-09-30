"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Stats {
  correctSpellings: number;
  totalSpellings: number;
  successPercentage: number;
  easyPercentage: number;
  mediumPercentage: number;
  hardPercentage: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>();
  // Sample data - replace with actual data from your app
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/result`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const { data } = await res.json();
        // console.log(data[0]);
        // Handle the data as needed

        const newStat: Stats = {
          correctSpellings: data[0]?.correct_spellings ?? 0,
          totalSpellings: data[0]?.total_attempts ?? 0,
          successPercentage: data[0]?.success_percentage?.toFixed(2) ?? "0.00",
          easyPercentage: ((data[0]?.easy_correct ?? 0) / (data[0]?.total_attempts || 1)) * 100,
          mediumPercentage: ((data[0]?.medium_correct ?? 0) / (data[0]?.total_attempts || 1)) * 100,
          hardPercentage: ((data[0]?.hard_correct ?? 0) / (data[0]?.total_attempts || 1)) * 100,
        };

        // console.log(newStat);
        setStats(newStat);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, []);

  const chartData: ChartData<"doughnut"> = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          stats?.easyPercentage ?? 0,
          stats?.mediumPercentage ?? 0,
          stats?.hardPercentage ?? 0,
        ],
        backgroundColor: ["#00BFFF", "#006699", "#003366"],
        hoverBackgroundColor: ["#33CCFF", "#0088CC", "#004C99"],
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
        },
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className=" bg-[#005580] text-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#006699] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Correct Spellings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.correctSpellings}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#006699] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spellings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalSpellings}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#006699] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Percentage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.successPercentage}%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#006699] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Difficulty Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs">
                Easy: {stats?.easyPercentage.toFixed(2)}% | Medium:{" "}
                {stats?.mediumPercentage.toFixed(2)}% | Hard:{" "}
                {stats?.hardPercentage.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-[#006699] border-none">
          <CardHeader>
            <CardTitle>Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
