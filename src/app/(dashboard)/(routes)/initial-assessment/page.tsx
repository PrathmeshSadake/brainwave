import { getQuestions } from "@/app/supabase-server";
import InitialAssessmentCreationCard from "@/components/initial-assessment-creation";
import React from "react";

const page = async () => {
  const data = await getQuestions();
  return <InitialAssessmentCreationCard QuestionList={data} />;
};

export default page;
