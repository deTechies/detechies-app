import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'

export default function MyRolesCard({user}: {user:any}) {
  //getting all the roles the user has from a graphql endpoint. 
  return (
    <Card>
        <CardHeader>
            My Roles
        </CardHeader>
        <CardContent>
            <div className="flex flex-col">
                <p>Member</p>
            </div>
        </CardContent>
    </Card>
  )
}
