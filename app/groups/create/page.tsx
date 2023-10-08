import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GroupForm } from "./group-form";

export default function CreateGroup() {
  return (
    <Card>   
        <CardHeader className="flex gap-4 items-center">
            <Link href="/groups">
                <ArrowLeft />
            </Link>
            <h3>    Create New Group</h3>
        </CardHeader>
        <CardContent>
            <GroupForm />                
        </CardContent>
        
    </Card>

  )
}
