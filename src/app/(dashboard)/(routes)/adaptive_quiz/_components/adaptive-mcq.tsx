"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MCQCounter from "@/components/mcq-counter";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { storeInDb } from "../_utils/store-question";
import { generateNextQuestion } from "../_utils/generate-question";

type Option = {
  text: string;
  correct: string;
};

interface Game {
  total_questions: number;
  topic: string;
  id: string;
}

const AdaptiveMCQ = ({ game }: { game: Game }) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number | null>(
    null
  );
  const [submissions, setSubmissions] = useState([] as any[]);
  const [questionList, setQuestionList] = useState([] as any[]);
  const [started, setStarted] = useState(false);

  const generateQuestion = async ({
    prevQuestion,
    user_answer,
  }: {
    prevQuestion?: string;
    user_answer?: string;
  }) => {
    const { question, options, correct_answer, success } =
      await generateNextQuestion({
        topic: game.topic,
        previousQuestion: prevQuestion ?? "",
      });

    if (!success) {
      toast({ title: "Error generating question" });
      return;
    }
    const { success: hasStored, data } = await storeInDb({
      question,
      correct_answer,
      options,
      quizId: game.id,
      user_answer: user_answer ?? "",
    });

    if (!hasStored) {
      toast({ title: "Error storing question" });
      return;
    }
    const result = data![0];
    setQuestionList((prev) => [...prev, result]);
  };

  const startQuiz = async () => {
    generateQuestion({ prevQuestion: "" });
    setStarted(true);
  };

  const handleNext = async () => {
    if (game.total_questions === questionIndex + 1) {
      setHasEnded(true);
      return;
    } else {
      const prevQuestion = questionList[questionIndex];
      const prevOption = JSON.parse(prevQuestion?.options);
      setSubmissions((prev) => [
        ...prev,
        {
          question: prevQuestion?.question,
          user_answer: prevOption[selectedChoice!] ?? "",
        },
      ]);
      generateQuestion({
        prevQuestion: prevQuestion?.question,
        user_answer: prevOption[selectedChoice!] ?? "",
      });
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const currentQuestion = React.useMemo(() => {
    return questionList[questionIndex];
  }, [questionIndex, questionList]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion?.options) return [];
    return JSON.parse(currentQuestion?.options) as any[];
  }, [currentQuestion]);

  if (!started) {
    return (
      <div className="flex flex-row justify-center">
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          onClick={startQuiz}
        >
          Start <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  if (hasEnded) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Link
          href={`/statistics`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto md:w-[70vw] w-[90vw]">
      <Toaster />
      <div className="flex flex-row justify-between">
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={hasEnded}
          onClick={handleNext}
        >
          Generate <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
        <div className="flex flex-col">
          {/* topic */}
          <p>
            {game.topic !== "Initial Assessment" && (
              <span className="text-slate-400">Topic &nbsp;</span>
            )}
            <span className="px-2 py-1 text-zinc-600 rounded-lg border border-zinc-600">
              {game.topic}
            </span>
          </p>
        </div>
        <MCQCounter
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>
      {!currentQuestion ? (
        <div className="">Loading...</div>
      ) : (
        <>
          <Card className="w-full mt-4">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                <div>{questionIndex + 1}</div>
                <div className="text-base text-slate-400">
                  {game.total_questions}
                </div>
              </CardTitle>
              <CardDescription className="flex-grow text-lg">
                {currentQuestion?.question}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            {Object.keys(options)?.map((option: any, index: number) => {
              return (
                <Button
                  key={option}
                  variant={selectedChoice === option ? "default" : "outline"}
                  className="justify-start w-full py-8 mb-4"
                  onClick={() => setSelectedChoice(option)}
                >
                  <div className="flex items-center justify-start">
                    <div className="p-2 px-3 mr-5 border rounded-md">
                      {option}
                    </div>
                    <div className="text-start">{options[option]}</div>
                  </div>
                </Button>
              );
            })}
            <Button
              variant="default"
              className="mt-2"
              size="lg"
              disabled={hasEnded}
              onClick={() => handleNext()}
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdaptiveMCQ;
