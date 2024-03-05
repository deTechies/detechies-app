import { Card, CardContent, CardHeader } from '@/components/metronic/card/card'
import { Badge } from '@/components/ui/badge'
import { serverApi } from '@/lib/data/general'
import Image from 'next/image'


export default async function MyLanguagesCard({
    address
    }: {
    address: string
}) {
    
    const {data: languages} = await serverApi(`/users/${address}/languages`)
  return (
    <Card>
        <CardHeader>
            Languages
        </CardHeader>
        <CardContent>
            {
                languages?.length > 0 ? (
                    <div className="flex flex-row gap-2 flex-wrap">
                        {languages?.map((language: any, index: number) => (
                            <Badge key={index} className="flex flex-col gap-2 content-center items-center " shape="icon">
                                <Image 
                                    src={`/images/metronic/icons/js.png`}
                                    width={18}
                                    height={18}
                                    className='my-auto'
                                    alt={language.language + ' count' + language.count} 
                                />
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p>No languages</p>
                )
            }
        </CardContent>
    </Card>
  )
}
