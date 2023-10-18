"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateAchievementForm } from "./create-achievement-form";


export default function AddAchievemntPage() {
  
  return (
    <Card className="m-10">
      <CardHeader>
        Create a new achievement
      </CardHeader>
      <CardContent>
      <CreateAchievementForm />
      </CardContent>
    </Card>
  )
}
