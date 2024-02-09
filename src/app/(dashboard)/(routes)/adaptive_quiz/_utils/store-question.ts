import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const storeInDb = async ({
  question,
  correct_answer,
  options,
  quizId,
  user_answer,
}: {
  question: string;
  correct_answer: string;
  options: object;
  quizId: string;
  user_answer: string;
}) => {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("adaptive_quiz_question")
    .insert([
      {
        correct_answer: correct_answer,
        question: question,
        options: JSON.stringify(options),
        quizId: quizId,
        user_answer: user_answer,
      },
    ])
    .select("*");
  if (error) {
    console.log(error);
    return { error, success: false };
  }
  return { data, success: true };
};
