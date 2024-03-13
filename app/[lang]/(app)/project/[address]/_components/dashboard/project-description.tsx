import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'

export default function ProjectDescription({
    description
}: {
    description: string
}) {
  return (
    <Card>
        <CardHeader>
            Project Description
        </CardHeader>
        <CardContent>
            {description ? description : "No description available"}
        </CardContent>
    </Card>
  )
}
