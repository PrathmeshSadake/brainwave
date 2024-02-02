import { getQuestions } from "@/app/supabase-server";
import MCQ from "@/components/mcq";
import React from "react";

const page = async () => {
  const data = await getQuestions();

  return (
    <MCQ
      game={{
        questions: data,
        topic: "Initial Assessment",
        id: "Initial Assessment",
      }}
    />
  );
};

export default page;
