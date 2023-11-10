"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Address } from "wagmi";
import { CreateAchievementForm } from "./create-achievement-form";


export default function AddAchievemntPage() {
  const searchParams = useSearchParams()!;
  //get the contract address from a search param

  const contract = searchParams.get("contract");
  return (
    <Card className="m-10">
      <CardHeader>
        Create a new achievement for {contract}
      </CardHeader>
      <CardContent>
      <CreateAchievementForm contract={contract as Address} />
      </CardContent>
    </Card>
  )
}
