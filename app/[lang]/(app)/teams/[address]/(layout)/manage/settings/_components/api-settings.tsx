import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ClipboardCopy } from "lucide-react";

export default function ApiSettings({ teamId }: { teamId: string }) {
  return (
    <Card className="w-full">
      <CardHeader>Manage API</CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-md">
          <Label className="w-[320px] shrink-0">API Key</Label>
          <div className="bg-background-layer-2 rounded-sm py-[12px] px-[13px] border border-border-div flex justify-between items-center w-full">
            <span className="text-sm">abc123xyz456sample789key000</span>
            <Button variant={"secondary"} size="sm">
              <ClipboardCopy size="12"/>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
