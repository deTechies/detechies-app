"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ABI, MUMBAI } from "@/lib/constants";
import { createGroupContract } from "@/lib/data/groups";
import { Club } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export default function CreateGroupContract({
  group,
  lang,
}: {
  group: Club;
  lang: any;
}) {
  const { write, data, isLoading } = useContractWrite({
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
        <CardHeader className="text-center">
          <h1 className="w-full text-subhead_s">
            {lang.group.details.profile_card.group_contract.title}
          </h1>
        </CardHeader>

        <CardContent className="text-center">
          {data && data.hash}

          <p className="mb-8">
            {lang.group.details.profile_card.group_contract.desc}
            <a
              className="text-accent-primary "
              href="https://t.me/Careerzen_org"
              target="_blank"
            >
              {lang.group.details.profile_card.group_contract.anchor}
            </a>
            {")"}
          </p>

          <Button size="lg" onClick={createGroup} loading={isLoading}>
            {lang.group.details.profile_card.group_contract.button}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
