"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Equal, Timer } from "lucide-react";

export default function MatchingCard({ data }: { data: any }) {
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Hourly Rate</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${parseInt(data.hourly_rate).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Hours</h3>
            <Timer
                size={14}
                />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.weekly_hours}</div>
            <p className="text-xs text-muted-foreground">
              hours per week 
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Matching</h3>
            <Equal 
            size={14}
            />
          </CardHeader>
          <CardContent>
            {data.match == '100' ? <div className="text-2xl font-bold text-accent-primary text-center uppercase">Yes</div> : <div className="text-2xl font-bold text-state-error">No</div>}
          </CardContent>
        </Card>
      </div>
      
      {
        data.match == '100' && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               <div  className="flex flex-col gap-2">
                <Label>
                    Contribution rate
                </Label>
                <section className="flex gap-3 items-center">
                <div className="grow">
                        <Progress value={data.rate_contributions} />
                    </div>
                    <span className="text-label_m">
                    {parseInt(data.rate_contributions)/20} / 5

                    </span>
                   
                </section>
              </div>
              <div  className="flex flex-col gap-2">
                <Label>
                    Requirements rate
                </Label>
                <section className="flex gap-3 items-center">
                <div className="grow">
                        <Progress value={data.rate_requirements} />
                    </div>
                    <span className="text-label_m">
                        {parseInt(data.rate_requirements)/20} / 5
                    </span>
                   
                </section>
              </div>
              <div  className="flex flex-col gap-2">
                <Label>
                    Time Schedule rate
                </Label>
                <section className="flex gap-3 items-center">
                <div className="grow">
                        <Progress value={data.rate_time_schedule} />
                    </div>
                    <span className="text-label_m">
                    {parseInt(data.rate_time_schedule)/20} / 5
                    </span>
                   
                </section>
              </div>

      </div>
        )
      }
      <span className="text-right text-text-secondary text-label_m">
        Added at: {data.created_at}
      </span>
    </Card>
  );
}
