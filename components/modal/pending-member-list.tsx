
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

export default function PendingMemberList({
  pendingMembers
}: {
    pendingMembers: any[]
}) {
  return (
    <Dialog>
      <DialogTrigger>
         Pending {pendingMembers.length}
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          {pendingMembers.map((member, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-text-primary font-medium">
                NAME
              </span>
              <span className="text-text-secondary">{JSON.stringify(member)}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
