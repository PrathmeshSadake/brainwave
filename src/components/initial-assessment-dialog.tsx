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
          <AlertDialogTitle>Give initail assessment?</AlertDialogTitle>
          <AlertDialogDescription>
            Take the initial assessment to get started.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.push("/initial-assessment")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
