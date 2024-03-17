import { Suspense } from "react";

export default function ManageTeamLayout({children}: {children: any}) {
  return (
    <div>
        <Suspense fallback={<span>Loading...</span>}>
            {children}
        </Suspense>
    </div>
  )
}
