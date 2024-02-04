import { getQuizById } from "@/app/supabase-server";
import MCQ from "@/components/mcq";
import React from "react";

const page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
  const quizData = await getQuizById(quizId);
  return (
    <MCQ
      game={{
        questions: quizData![0]?.questions,
        topic: quizData![0]?.topic ?? "Initial Assessment",
        id: quizData![0]?.id ?? "0",
      }}
    />
  );
};

export default page;
