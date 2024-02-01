import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { Clock, CopyCheck, LucideLayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

const History = async (props: Props) => {
  const user = await currentUser();
  const games = await prisma.game.findMany({
    take: 10,
    where: {
      userId: user?.id,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-2xl font-bold'>History</CardTitle>
            <Link className={buttonVariants()} href='/dashboard'>
              <LucideLayoutDashboard className='mr-2' />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className='max-h-[60vh] overflow-scroll'>
          <div className='space-y-8'>
            {games.map((game) => {
              return (
                <div
                  className='flex items-center justify-between'
                  key={game.id}
                >
                  <div className='flex items-center'>
                    <CopyCheck className='mr-3' />

                    <div className='ml-4 space-y-1'>
                      <Link
                        className='text-base font-medium leading-none underline'
                        href={`/statistics/${game.id}`}
                      >
                        {game.topic}
                      </Link>
                      <p className='flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800'>
                        <Clock className='w-4 h-4 mr-1' />
                        {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Multiple Choice
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
