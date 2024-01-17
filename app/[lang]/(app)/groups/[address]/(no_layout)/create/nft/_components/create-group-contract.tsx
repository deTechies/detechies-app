"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ABI, MUMBAI } from "@/lib/constants";
import { postServer } from "@/lib/data/postRequest";
import { Club } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export default function CreateGroupContract({ group }: { group: Club }) {
  const { write, data, isLoading } = useContractWrite({
    address: MUMBAI.groupRegistry,
    abi: ABI.groupRegistry,
    functionName: "createGroup",
  });

  const { isFetched } = useWaitForTransaction(data);

  const { refresh } = useRouter();

  useEffect(() => {
    const submitGroup = async () => {
      //const result = await createGroupContract(group.id, "something");

      const result = await postServer(`/clubs/add-contract/${group.id}`, "");
      if (result) {
        toast({
          title: "Group Contract",
          description: "Group contract created successfully",
        });
      }

      refresh();
    };

    if (isFetched) {
      submitGroup();
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
        <CardContent className="text-center">
          {data && data.hash}
          <p>
            This is a one time action. You can only create the group contract
            once. If you want to change the group details you can do it from the
            group page.
          </p>
          <Button className="mt-4" onClick={createGroup} loading={isLoading}>
            Create Group Contract
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
