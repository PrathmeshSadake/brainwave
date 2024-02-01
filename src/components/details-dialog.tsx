import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

const DetailsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <span className='flex items-center px-2 py-1 text-white rounded-md bg-slate-800'>
          What is this */}
        <HelpCircle className='w-5 h-5 ml-2' />
        {/* </span> */}
      </DialogTrigger>
      <DialogContent className='w-[70vw] max-w-[100vw] md:w-[50vw]'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Welcome to Quizmify!</DialogTitle>
          <DialogDescription>
            <p className='my-2 mt-4 '>
              Are you tired of mundane and repetitive quizzes? Say goodbye to
              the ordinary and embrace the extraordinary with Quizmify! Our
              platform is revolutionizing the quiz and trivia experience by
              harnessing the immense potential of artificial intelligence.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
