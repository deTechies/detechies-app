import EmptyState from "@/components/metronic/custom/empty-state"
import { Card, CardContent } from "@/components/ui/card"
import { serverApi } from "@/lib/data/general"
import { formatDateToTimeAgo } from "@/lib/utils"

export default async function PaymentList() {
    const {data: payments} = await serverApi("/payments")
  return (
    <Card>
        <CardContent>
            {
                payments && payments.length > 0 ?
                payments.map((payment: any, index: number) => {
                    return (
                        <div key={index} className="flex flex-row items-center border-b border-border-div last:rounded-b-[10px] last:border-b-0 justify-between py-4 px-8 hover:bg-background-layer-2">
                            <span className="text-text-secondary">{payment?.amount}</span>
                            <span>{formatDateToTimeAgo(payment?.created_at)}</span>
                        </div>
                    )
                })
                : <EmptyState title="No Payments" subtitle="No payments were found to this user" />
            }
        </CardContent>
    </Card>
  )
}
