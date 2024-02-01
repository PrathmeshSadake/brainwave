"use client"; // don't forget this part if you use app dir to mark the whole
import { Card, CardContent } from "@/components/ui/card";
// file as client-side components

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const page = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex space-x-2 items-center'>
        <Card>
          <CardContent>
            <Chart
              type='radialBar'
              options={{
                chart: {
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "50%",
                    },
                  },
                },
                labels: ["Knowledge"],
              }}
              series={[90]}
              labels={["Knowledge"]}
              height={300}
              width={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Chart
              type='radialBar'
              options={{
                series: [70],
                chart: {
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "50%",
                    },
                  },
                },
                labels: ["Analytical Skills"],
              }}
              series={[90]}
              labels={["Analytical Skills"]}
              height={300}
              width={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Chart
              type='radialBar'
              options={{
                series: [70],
                chart: {
                  height: 350,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "50%",
                    },
                  },
                },
                labels: ["Critical Thinking"],
              }}
              series={[90]}
              labels={["Critical Thinking"]}
              height={300}
              width={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
