"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ABI, MUMBAI } from "@/lib/constants";
import { createGroupContract } from "@/lib/data/groups";
import { Club } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { GitPullRequest } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export default function CreateGroupContract({ group }: { group: Club }) {
  const { write, data, isLoading, error } = useContractWrite({
    address: MUMBAI.groupRegistry,
    abi: ABI.groupRegistry,
    functionName: "createGroup",
  });

  const { isFetched } = useWaitForTransaction(data);

  const { refresh } = useRouter();

  useEffect(() => {
    const submitGroup = async () => {
      const result = await createGroupContract(group.id, "something");

      if (result.ok) {
        toast({
          title: "Group Contract",
          description: "Group contract created successfully",
        });
      }
    };

    if (isFetched) {
      submitGroup();
      refresh();
    }
  }, [isFetched, group.id, refresh]);

  const createGroup = async () => {
    try {
      const groupDetails = await uploadContent(JSON.stringify(group));

      await write({
        args: [group.id, group.name, groupDetails],
      });
    } catch (e) {
      // Handle errors
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to create group contract",
      });
    }
  };

  return (
    <main className="m-8">
      <Card className="max-w-2xl">
        <CardHeader>
          <h1 className="text-title_l">Create Group Contract</h1>
        </CardHeader>
        <CardContent>
          {data && data.hash}
          <p>
            This is a one time action. You can only create the group contract
            once. If you want to change the group details you can do it from the
            group page.
          </p>
          <GitPullRequest size={"64"} className="animate-pulse" />
          <Button className="mt-4" onClick={createGroup} loading={isLoading}>
            Create Group Contract
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
