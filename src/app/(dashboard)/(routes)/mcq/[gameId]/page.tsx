import MCQ from "@/components/mcq";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQPage = async ({ params: { gameId } }: Props) => {
  // authenticated user
  const user = {};
  if (!user) {
    return redirect("/");
  }
  // find unique game based on user id along with questions included
  const game = {};
  if (!game) {
    return redirect("/quiz");
  }
  return <MCQ game={game} />;
};

export default MCQPage;
