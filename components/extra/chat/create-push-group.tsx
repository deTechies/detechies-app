"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { PushContext } from "@/lib/usePushProtocol";
import { ConditionType, Rules } from "@pushprotocol/restapi";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function CreatePushGroup({
  image,
  members,
}: {
  image: string;
  members: string[];
}) {
  const { address } = useParams();
  const chatter = useContext(PushContext);
  const createGroup = async function () {
    if (!chatter) return;

    const contract = "0x";
    window.alert("creating group");

    const rules = {
      // define rules to gate different permissions of the group, ie: joining group or sending messages
      entry: {
        // define condition for joining the group
        conditions: [
          {
            // set of all conditions that should be fulfilled to join the group
            any: [
              {
                // define criteria 1
                type: ConditionType.PUSH, // define type that rules engine should go for, currently supports PUSH or GUILD
                category: "ERC721",
                subcategory: "owner", // define if you are checking 'holder' or 'owner'
                data: {
                  // define the data check
                  contract: `eip155:80001:${address}`, // pass {blockchain_standard}:{chain_id}:{address} as a shorthand
                  comparison: ">=", // what comparison needs to pass
                  amount: 1, // amount that needs to passed
                },
              },
            ],
          },
        ],
      },
      chat: {
        conditions: [
          {
            all: [
              {
                // define criteria 1
                type: ConditionType.PUSH, // define type that rules engine should go for, currently supports PUSH or GUILD
                category: "ERC721", // define it's ERC20 token that you want to check, supports ERC721 as well
                subcategory: "owner", // define if you are checking 'holder' or 'owner'
                data: {
                  // define the data check
                  contract: `eip155:80001:${address}`, // pass {blockchain_standard}:{chain_id}:{address} as a shorthand
                  comparison: ">=", // what comparison needs to pass
                  amount: 1, // amount that needs to passed
                },
              },
            ],
          },
        ],
      },
    } as Rules;

    //this does not work unfortunately so lets try it agaon.
    const createdGroup = await chatter.chat.group.create(
      `Group chat of ${contract}`,
      {
        description:
          "This group is created by one of the members of this contract group at careerzen.org. ",
        members: members,
        image: "https://ipfs.io/",
        admins: [],
        private: true,
        rules: rules,
      }
    );
    const groupChatId = createdGroup.chatId;

    //we want to store this such that we can always retrieve it. so what we do is

    if (groupChatId) {
      await fetch(`${API_URL}/group/newGroup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: groupChatId,
          to: address,
          from: address,
        }),
      })
        .then((result) => {
          console.log(result);
          toast({
            title: "Succesfully Created",
          });
        })
        .catch((err) => {
          toast({
            title: "Could not create a new group",
            description: err.toString(),
          });
        });
    }
  };

  return (
    <Card>
      <span>{address}</span>
      <Input placeholder="Group name" value={`Group chat of ${address}`} />
      <Button onClick={createGroup}>Create Group</Button>
    </Card>
  );
}
