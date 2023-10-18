import Links from "@/app/project/[address]/links"
import { Card } from "@/components/ui/card"




export default function GroupDetails({details}: {details: any}) {
  return (
    <Card>
        <div className="w-full border rounded-sm flex flex-col gap-2 p-4">
          <h4 className="font-medium">Links</h4>
              <Links links={details?.links}/>
        </div>
        <div className="w-full border rounded-sm flex flex-col gap-2 p-4">
          <h4 className="font-medium">Description</h4>
          <p className="text-text-secondary tracking-tight">
                {details?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, eu ultricies nisl nisl sit amet nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, eu ultricies nisl nisl sit amet nisl."}
            </p>
        </div>


    </Card>
             
  )
}


