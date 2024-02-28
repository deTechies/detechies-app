
import { LanguagePercentage } from '@/components/connections/github/types'
import CustomPieChart from '@/components/metronic/charts/recharts/custom-pie-chart'
import { Card, CardHeader } from '@/components/ui/card'

export default function ProjectLanguages({languages}: {
    languages: LanguagePercentage[]
}) {
  return (
    <Card>
        <CardHeader>
            Languages
        </CardHeader>
        <CustomPieChart data={languages} />
    </Card>
  )
}
