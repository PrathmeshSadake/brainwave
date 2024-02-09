import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate feedback for the user's answer using OpenAI API
const generateFeedback = async (question, userAnswer) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Based on the user's answer to the question, provide personalized feedback that encourages further learning and understanding of the topic. Question: ${question} User Answer: ${userAnswer}`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
    });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
};

// Function to generate a multiple-choice question using OpenAI API
const generateQuestion = async ({
  topic = "Integers",
  wasIncorrect = true,
  previousQuestion = "What is the result of multiplying -6 by 4?",
}) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful AI that is able to generate a single mcq question and answers, the length of each answer should not be more than 15 words.  \nDo not put quotation marks or escape character \\ in the output fields. Store the answer and question in a JSON and options in an Array, the output should be in json format like: ${JSON.stringify(
            {
              question: "question",
              answer: "answer with max length of 15 words",
              option1: "option1 with max length of 15 words",
              option2: "option2 with max length of 15 words",
              option3: "option3 with max length of 15 words",
            }
          )}. You are to generate a random hard mcq question about ${topic}. Generate a slighter ${
            wasIncorrect ? "easier" : "difficult"
          } question. Than previous question. The previous question was: ${previousQuestion}`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    let res = response.choices[0].message?.content?.replace(/'/g, '"') ?? "";
    res = res.replace(/(\w)"(\w)/g, "$1'$2");
    let output = JSON.parse(res);
    console.log(output);
    generateFeedback(output.question, output.answer);
  } catch (error) {
    console.log(error);
  }
};

generateQuestion({
  topic: "Integers",
  wasIncorrect: true,
  previousQuestion: "What is the result of multiplying -6 by 4?",
});
