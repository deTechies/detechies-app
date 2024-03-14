
import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'
import CustomPieChart from '@/components/metronic/charts/recharts/custom-pie-chart'
import EmptyState from '@/components/metronic/custom/empty-state'
import { serverApi } from '@/lib/data/general'


export default async function ProjectLanguages({projectId}: {
    projectId: string
}) {
  const {data: projectLanguages} = await serverApi(`/project-sources/${projectId}/languages`)

  return (
    <Card className="min-w-[400px]">
        <CardHeader>
            Languages
        </CardHeader>
        <CardContent>
          {
            projectLanguages && projectLanguages.length > 0  ? 
            <CustomPieChart data={projectLanguages} />
            : 
            <EmptyState title="No languages" subtitle="No languages were found in this project"/>
          }
        </CardContent>
    </Card>
  )
}
