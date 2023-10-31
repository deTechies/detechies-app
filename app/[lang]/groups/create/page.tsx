import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GroupForm } from "./group-form";

export default function CreateGroup() {
  return (
    <Card className="m-20 max-w-4xl">   
        <CardHeader className="flex gap-4 items-center prose">
          <h4>Create New Group</h4>
        </CardHeader>
        <CardContent>
            <GroupForm />                
        </CardContent>
        
    </Card>

  )
}
