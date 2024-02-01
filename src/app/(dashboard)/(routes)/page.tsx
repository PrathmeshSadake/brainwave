import { getQuestions } from "@/app/supabase-server";
import DetailsDialog from "@/components/details-dialog";
import HistoryCard from "@/components/history-card";
import MCQ from "@/components/mcq";
import QuizMeCard from "@/components/quiz";

const Home = async () => {
  const data = await getQuestions();
  console.log(data);
  return (
    <div>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-semibold tracking-tight'>
          Dashboard
        </h2>
        <DetailsDialog />
      </div>

      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        {/* <QuizMeCard />
        <HistoryCard /> */}
        <MCQ
          game={{
            questions: data,
            topic: "Initial Assessment",
            id: "Initial Assessment",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
