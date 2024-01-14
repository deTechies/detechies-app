'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Error() {
  return (
    <Card className="max-w-xl mx-auto my-auto mt-20">
        <h1 className="text-title_l text-state-error">
          Error
        </h1>
        <p>
          Something went wrong, please try again later.
          If it persists, please contact us.
        </p>
        <Button variant="secondary" size="lg" className="mt-4 mx-auto">
          Contact us
        </Button>
    </Card>
  )
}
