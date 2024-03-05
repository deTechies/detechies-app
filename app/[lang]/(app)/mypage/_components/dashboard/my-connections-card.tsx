import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'


export default function MyConnections({
    connections
}: {
    connections: any
}) {
  return (
    <Card>
        <CardHeader>
            Connections
        </CardHeader>
        <CardContent>
            {
                connections?.length > 0 ? (
                    <div>
                        {connections.map((connection: any, index: number) => (
                            <div key={index}>
                                <p>{connection.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No connections</p>
                )
            }
        </CardContent>
    </Card>
  )
}
