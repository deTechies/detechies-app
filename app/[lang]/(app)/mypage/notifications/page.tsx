import { serverApi } from "@/lib/data/general"

export default async function NotificationList() {
    const {data: notifications} = await serverApi(`/notify/all`)
  return (
    <div>NotificationList</div>
  )
}
