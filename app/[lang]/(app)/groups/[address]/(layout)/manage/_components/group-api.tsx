"use client"
import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { Input } from "@/components/ui/input";

export default function GroupApi() {
  return (
    <Card>
        <CardHeader>
            <h1>
                Manage API
            </h1>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <label className="w-[100px]">API Key</label>
            <Input type="text" 
            className="max-w-[300px]"
            />
          </div>
        </CardContent>
    </Card>
  )
}
