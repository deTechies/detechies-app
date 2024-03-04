import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { Label } from "@/components/ui/label";


export default function GroupDetails({ details }: { details: any }) {
  return (
    <Card className="">
     <CardHeader>
        <h1>Group Details</h1>
     </CardHeader>
     <CardContent>
      <div className="flex flex-col">
        <Label>About</Label>
        <p
        className="text-sm text-gray-700 "
        dangerouslySetInnerHTML={{
          __html: details.description ? details.description : "No description",
        }}
      ></p>
      </div>
        
      
     </CardContent>
    </Card>
  );
}
