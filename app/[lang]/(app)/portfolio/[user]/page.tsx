import { Card } from "@/components/ui/card";

export default function UserProfile({
    params
} : {params:any}) {
  return (
    <Card>
        <h1>
            Not yet implemented
        </h1>
        <div>
        {params.user}
    </div>
    </Card>

  )
}
