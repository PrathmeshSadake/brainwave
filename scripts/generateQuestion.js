export const generateQuestion = async (topic, isEasy, previousQuestion) => {
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
            isEasy ? "easier" : "difficult"
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
    return { success: true, output };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
