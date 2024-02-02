"use client";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDialog from "@/store/dialog";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { userAssessmentStatus } from "@/app/supabase-server";

const QuizMeCard = () => {
  const router = useRouter();
  const state = useDialog();

  useEffect(() => {
    (async () => {
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();
      if (error) {
        console.error(error);
      }
      if (!data?.initial_assessment_status) {
        state.setOpen();
        console.log("User not found");
      }
    })();
  }, []);
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push("/quiz");
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Quiz me!</CardTitle>
        <BrainCircuit size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Challenge yourself to a quiz with a topic of your choice.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
