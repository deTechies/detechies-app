
import { LanguagePercentage } from '@/components/connections/github/types'
import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'
import CustomPieChart from '@/components/metronic/charts/recharts/custom-pie-chart'


export default function ProjectLanguages({languages}: {
    languages: LanguagePercentage[]
}) {
  return (
    <Card>
        <CardHeader>
            Languages
        </CardHeader>
        <CardContent>
        <CustomPieChart data={languages} />
        </CardContent>
    </Card>
  )
}
