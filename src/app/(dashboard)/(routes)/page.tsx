import { getQuestions, getSession } from "@/app/supabase-server";
import DetailsDialog from "@/components/details-dialog";
import HistoryCard from "@/components/history-card";
import InitialAssessmentCard from "@/components/initial-assessment-card";
import InitialAssessmentDialog from "@/components/initial-assessment-dialog";
import MCQ from "@/components/mcq";
import QuizMeCard from "@/components/quiz";
import { redirect } from "next/navigation";

const Home = async () => {
  // const session = await getSession();
  // const user = session?.user;
  // // const isAssessmentDone = await userAssessmentStatus(user?.id!);
  // if (!user) {
  //   return redirect("/initial-assessment");
  // }

  return (
    <div>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-semibold tracking-tight'>
          Dashboard
        </h2>
        <DetailsDialog />
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <InitialAssessmentCard />
        <HistoryCard />
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-1'>
        <QuizMeCard />
        {/* <HistoryCard /> */}
      </div>
      <InitialAssessmentDialog />
    </div>
  );
};

export default Home;
