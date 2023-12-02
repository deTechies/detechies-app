import { Card } from "@/components/ui/card";
import { GroupForm } from "./group-form";

export default function CreateGroup() {
  return (
    <Card className="w-full max-w-2xl mx-auto my-12">
      <h4>Create Club</h4>
      <GroupForm />
    </Card>
  );
}
