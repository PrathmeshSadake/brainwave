// "use client"; // don't forget this part if you use app dir to mark the whole
import { getInitialAssessmentStats } from "@/app/supabase-server";
import AccuracyCard from "@/components/accuracy-card";
import ResultsCard from "@/components/results-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideLayoutDashboard } from "lucide-react";
// file as client-side components

import dynamic from "next/dynamic";
import Link from "next/link";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const page = async () => {
  const data = await getInitialAssessmentStats();

  let accuracy: number = 0;

  if (data && data[0].total_questions !== 0) {
    accuracy = (data[0].correct_answers / data[0].total_questions) * 100;
  }

  return (
    <div className='p-8 mx-auto max-w-7xl'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-semibold tracking-tight'>Summary</h2>
        <div className='flex items-center space-x-2'>
          <Link href='/' className={buttonVariants()}>
            <LucideLayoutDashboard className='mr-2' />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className='grid gap-4 mt-4 md:grid-cols-7'>
        <ResultsCard accuracy={accuracy} />
        <AccuracyCard accuracy={accuracy} />
        {/* <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)}
            timeStarted={new Date(game.timeStarted ?? 0)}
          /> */}
      </div>
      {/* <QuestionsList questions={game.questions} /> */}
    </div>
  );
};

export default page;
