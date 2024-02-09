export const generateNextQuestion = async ({
  topic,
  previousQuestion,
}: {
  topic: string;
  previousQuestion: string;
}) => {
  const res = await fetch("/api/generate-question", {
    method: "POST",
    body: JSON.stringify({
      topic: topic,
      isEasy: false,
      previousQuestion: previousQuestion,
    }),
  });
  const { success, output } = await res.json();
  if (!success) {
    console.log("error", output);
    return { question: "", options: [], correct_answer: "", success: false };
  }
  const question = output.question;
  const options = output.options;
  const correct_answer = output.answer;
  return { question, options, correct_answer, success: true };
};
