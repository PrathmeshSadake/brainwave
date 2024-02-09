import { getAdaptiveQuiz } from "@/app/supabase-server";
import React from "react";
import AdaptiveMCQ from "../_components/adaptive-mcq";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { success, data } = await getAdaptiveQuiz(id);
  if (!success) return <div>Quiz not found</div>;
  return (
    <AdaptiveMCQ
      game={{
        total_questions: data.total_questions,
        topic: data.topic,
        id: data.id,
      }}
    />
  );
};

export default page;
