import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";


export default function GroupDetails({ details }: { details: any }) {
  return (
    <Card className="">
     <CardHeader>
        <h1>About us</h1>
     </CardHeader>
     <CardContent>
      <div className="flex flex-col">
        <p
        className="text-text-secondary text-sm"
        dangerouslySetInnerHTML={{
          __html: details.description ? details.description : "No description",
        }}
      ></p>
      </div>
        
      
     </CardContent>
    </Card>
  );
}
