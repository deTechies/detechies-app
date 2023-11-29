import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Address } from "wagmi";
import { CreateAchievementForm } from "./create-achievement-form";

export default function AddAchievementPage(
  { params } :
  { params: { contract: string } }
) {

  return (
    <Card className="m-10">
      <CardHeader>Create a new achievement for {params.contract}</CardHeader>
      <CardContent>
        <CreateAchievementForm contract={params.contract as Address} />
      </CardContent>
    </Card>
  );
}
