import { Card, CardContent, CardHeader } from "@/components/ui/card"




export default function GroupDetails({details}: {details: any}) {
  return (
    <Card>
        <CardHeader>
          Project Description
        </CardHeader>
        <CardContent>
            <p>
                {details?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, eu ultricies nisl nisl sit amet nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, eu ultricies nisl nisl sit amet nisl."}
            </p>
            
        </CardContent>
    </Card>
             
  )
}

