'use client'

import { Card } from "@/components/ui/card"

export default function Error() {
  return (
    <Card className="max-w-xl">
        <h1 className="text-title_s">
          Error
        </h1>
        <p>
          Something went wrong, please try again later.
          If it persists, please contact us.
        </p>
    </Card>
  )
}
