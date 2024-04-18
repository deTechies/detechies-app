import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'
import { Badge } from '@/components/ui/badge'

export default function MyTagsCard({
    tags
    }: {
    tags: any
}) {
    if(!tags) {
        return
    }
  return (
    <Card>
        <CardHeader>
            My Skills
        </CardHeader>
        <CardContent >
            
            
            {
                tags.length > 0 ? (
                    <div className="inline-flex flex-row gap-2.5 flex-wrap ">
                
                        {tags.map((tag: any, index: number) => (
                            <Badge key={index} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p>No skills</p>
                )
            }
        </CardContent>
    </Card>
  )
}
