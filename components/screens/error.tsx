import { Card } from "../ui/card";

export default function Error({message}: {message: string}) {
  return (
    <Card>
        Something went wrong. 
        <p>
            {message}
        </p>
    </Card>
  )
}
