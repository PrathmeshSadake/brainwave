"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRouter } from "next/navigation";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  amount: z.number().min(1).max(10),
});

type Input = z.infer<typeof quizCreationSchema>;

function InitialAssessmentCreationCard() {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "Integers",
      amount: 10,
    },
  });

  const onSubmit = async (data: Input) => {
    console.log(data);
    router.push(`/initial-assessment/${data.topic}`);
  };
  form.watch();

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader>
        <CardTitle>Initial assessment</CardTitle>
        <CardDescription>
          his helps us tailor the quiz questions to your comfort level.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='topic'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Select defaultValue='integers'>
                      <SelectTrigger id='area'>
                        <SelectValue placeholder='Select' {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='trignometry'>Trignometry</SelectItem>
                        <SelectItem value='integers'>Integers</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Please provide any topic you would like to be quizzed on
                    here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='How many questions?'
                      type='number'
                      {...field}
                      onChange={(e) => {
                        form.setValue("amount", parseInt(e.target.value));
                      }}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormDescription>
                    You can choose how many questions you would like to be
                    quizzed on here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='w-full flex justify-between space-x-2 md:space-x-8'>
              <Button className='w-full' variant='outline'>
                Cancel
              </Button>
              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default InitialAssessmentCreationCard;
