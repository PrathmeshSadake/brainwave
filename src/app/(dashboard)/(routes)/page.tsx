import DetailsDialog from "@/components/details-dialog";
import HistoryCard from "@/components/history-card";
import QuizMeCard from "@/components/quiz";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-semibold tracking-tight'>
          Dashboard
        </h2>
        <DetailsDialog />
      </div>

      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <QuizMeCard />
        <HistoryCard />
      </div>
    </div>
  );
};

export default Home;
