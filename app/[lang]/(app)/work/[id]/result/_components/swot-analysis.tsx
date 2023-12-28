import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'


export default function SwotAnalysis({data}:{data:any}) {
    
    if(!data){
        <Card>
            This form has not been submitted yet.. 
        </Card>
    }
  return (
    <Card>
        <section className="flex flex-col gap-8">
            <div>
                <Label>
                    Strength
                </Label>
                <Textarea
                value={data?.strength}
                disabled
                />
            </div>
            <div>
                <Label>
                    Weakness
                </Label>
                <Textarea
                value={data?.weakness}
                disabled
                />
            </div>
            <div>
                <Label>
                    Advisory
                </Label>
                <Textarea
                value={data?.opportunity}
                disabled
                />
            </div>
        </section>
    </Card>
  )
}
