"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Editor } from "novel";

  export default function CareerForm() {

      
  
    async function saveIntroduction() {
        console.log();
    }
  
    return (
        <Card>
             <CardHeader className="flex justify-between my-4 items-center">
             <h1 className="font-medium text-lg">Tell more about yourself</h1>
                <Button onClick={saveIntroduction}>
                    Save
                </Button>
            </CardHeader>
           <CardContent>
            <Editor className="text-sm border bg-gray-50" completionApi="" />
            </CardContent>
        </Card>
    );
  }
  