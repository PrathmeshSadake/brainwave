"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDialog from "@/store/dialog";
import { useRouter } from "next/navigation";

export default function InitialAssessmentDialog() {
  const router = useRouter();
  const state = useDialog();
  return (
    <AlertDialog open={state.open} onOpenChange={state.setClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Quizmify</AlertDialogTitle>
          <AlertDialogDescription>
            Before you begin, we'd love to get to know you a bit better.
          </AlertDialogDescription>
          <AlertDialogDescription>
            This helps us tailor the quiz content to suit your age group. This
            helps us tailor the quiz questions to your comfort level. Ready to
            get started? Click the "Start Quiz" button below when you're done!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className='w-full'
            onClick={() => router.push("/initial-assessment")}
          >
            Start Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
