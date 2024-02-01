import QuizCreation from "@/components/quiz-creation";
export const metadata = {
  title: "Quizmify",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: {
    topic?: string;
  };
}
const QuizPage = async ({ searchParams }: Props) => {
  return <QuizCreation topic={searchParams.topic ?? ""} />;
};

export default QuizPage;
