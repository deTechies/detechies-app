import { DependenciesList } from '@/components/connections/github/dependencies-list'
import { Dependency } from '@/components/connections/github/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function ProjectPackages({packages}: {packages: Dependency[]}) {
  return (
    <Card>
        <CardHeader>
            Packages
        </CardHeader>
        <CardContent>
            <DependenciesList dependencies={packages} />
        </CardContent>
    </Card>
  )
}
