"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { PushContext } from "@/lib/usePushProtocol";
import { truncateMiddle } from "@/lib/utils";
import { ConditionType, Rules } from "@pushprotocol/restapi";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

export default function CreatePushGroup({
  image,
  members,
}: {
  image: string;
  members: any[];
}) {
  const { address } = useParams();
  const chatter = useContext(PushContext);
  const [loading, setLoading] = useState(false);
const [groupChatName, setGroupChatName] = useState(`Group chat of ${address}`)

  const createGroup = async function () {
    setLoading(true);
    if (!chatter) return;

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
                subcategory: "holder", // define if you are checking 'holder' or 'owner'
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
                subcategory: "holder", // define if you are checking 'holder' or 'owner'
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
    try {
      if (!chatter.user) {
        chatter.initializeUser();
        return;
      }
      const createdGroup = await chatter.user.chat.group.create(
        `Group chat of ${truncateMiddle(address.toString(), 8)}`,
        {
          description:
            "This group is created by one of the members of this contract group at careerzen.org. ",
          members: [],
          //@ts-ignore
          image: null,
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
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (!chatter)
    return (
      <Card>
        <h2>Please wait for Push Protocol is created</h2>
        <Loading />
      </Card>
    );

  return (
    <Card className="justify-center">
      <CardHeader>Create your personal group</CardHeader>

      <CardContent className="flex flex-col gap-4 max-w-lg ">
        <Label>Grouop Name</Label>
        <Input placeholder="Group name"  
        value={groupChatName}
        onChange={(e) => setGroupChatName(e.target.value)}
        maxLength={100} />
        <Button
          onClick={createGroup}
          disabled={!chatter || !address}
          loading={loading}
        >
          Create Group
        </Button>
      </CardContent>
    </Card>
  );
}
