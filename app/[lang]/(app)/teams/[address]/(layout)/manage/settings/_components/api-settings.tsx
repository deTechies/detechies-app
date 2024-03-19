import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import TopUpTrigger from "@/components/profile/topup/topup-trigger";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ClipboardCopy, UserIcon } from "lucide-react";
import Link from "next/link";

export default function ApiSettings({ teamId }: { teamId: string }) {
  //we need to get the API key from the server and build in the mechanism to validate that user has api access or not.
  return (
    <Card className="w-full">
      <CardHeader>Manage API</CardHeader>
      <CardContent className="flex flex-col gap-md">
        <div className="flex flex-row items-center gap-md">
          <Label className="w-[320px] shrink-0">API Key</Label>
          <div className="bg-background-layer-2 rounded-sm py-[12px] px-[13px] border border-border-div flex justify-between items-center w-full">
            <span className="text-sm">abc123xyz456sample789key000</span>
            <Button variant={"secondary"} size="sm">
              <ClipboardCopy size="12" />
            </Button>
          </div>
        </div>

        <div className="rounded-md shadow-sm p-5 flex flex-row gap-3 border border-border-div justify-between items-center">
          <div className="flex flex-row items-center gap-md">
            <UserIcon className="w-6 h-6" />
            <div>
              <p className="text-sm font-semibold">API Access</p>
              <p className="text-xs text-text-secondary">
                Enable or disable API access for this team
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-md items-center">
            <TopUpTrigger />
            <Link href="/">Docs</Link>
          </div>
        </div>
        <div>
          <span>
            Unlock the full potential of your application with our API, a secure
            gateway facilitating seamless integration, empowering developers to
            create innovative and dynamic experiences effortlessly.
          </span>{" "}
        </div>
      </CardContent>
    </Card>
  );
}
