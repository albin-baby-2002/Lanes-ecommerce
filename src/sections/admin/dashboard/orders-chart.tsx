"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "shirts", visitors: 275, fill: "var(--color-shirts)" },
  { browser: "tshirts", visitors: 200, fill: "var(--color-tshirts)" },
  { browser: "hoodies", visitors: 187, fill: "var(--color-hoodies)" },
  { browser: "shorts", visitors: 173, fill: "var(--color-shorts)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  shirts: {
    label: "shirts",
    color: "#3d3c3c",
  },
  tshirts: {
    label: "tshirts",
    color: "#3d3c3cdb",
  },
  hoodies: {
    label: "hoodies",
    color: "#3d3c3c9d",
  },
  shorts: {
    label: "shorts",
    color: "#3d3c3c7f",
  },
  other: {
    label: "Other",
    color: "#3c3c3d59",
  },
} satisfies ChartConfig

export function OrdersChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>Orders Chart </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
