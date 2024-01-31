import { Card } from '@/components/ui/card'

export default function ProjectListLoading() {
  return (
    <section className="grid w-full gap-4 md:grid-cols-2 truncate">
      {/* <loop through profile */}
      {Array(10)
        .fill(0)
        .map((profile: any, index) => (
          <Card key={index} className="h-[200px] w-full " >
            </Card>
        ))}
    </section>
  )
}
