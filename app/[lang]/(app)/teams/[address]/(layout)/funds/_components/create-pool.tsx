"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { MACI_REGISTRY, MACI_REGISTRY_ABI } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useState } from "react"

import { Address, useAccount, useContractRead, usePublicClient, useWalletClient } from "wagmi"
export default function CreatePool({
    profileId,
}: {
    profileId: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Create Pool</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create your pool</DrawerTitle>
          <DrawerDescription>
            Create a new pool
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm profileID={profileId} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({profileID }:{profileID: string}) {
    //we can create a new pool here easily.. 
    const { address: account } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();
    const {toast} = useToast();
     const { data:  maciTime } = useContractRead({
      address: MACI_REGISTRY,
      abi: MACI_REGISTRY_ABI,
      functionName: "getTime",
    });
    
    async function onSubmit() {
        if(maciTime === undefined){
    
          toast({
            title: "Error",
            description: "MACI Time not found",
          })
          return
        }
        //bigint to int
        const poolManagers = [
          {
            address: account as Address,
            allocation: BigInt(100),
          },
        ];
    
        const poolParams = {
          registryGating: false,
          metadataRequired: true,
          reviewThreshold: BigInt(1),
          registrationStartTime: maciTime + BigInt(100),
          registrationEndTime: maciTime + BigInt(200),
          allocationStartTime: maciTime + BigInt(200),
          allocationEndTime: maciTime + BigInt(500),
          maxVoiceCreditsPerAllocator: BigInt(100),
          coordinator: account as Address,
          coordinatorPubKey: {
            x: BigInt(
              "21888242871839275222246405745257275088548364400416034343698204186575808495611"
            ),
            y: BigInt(
              "21888242871839275222246405745257275088548364400416034343698204186575808495611"
            ),
          },
        };
    
        try {
          const data = await publicClient?.simulateContract({
            account,
            address: MACI_REGISTRY,
            abi: MACI_REGISTRY_ABI,
            functionName: "createQVMaciPool",
            args: [
                profileID as Address,
              poolParams,
              "0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A" as Address,
              BigInt(0),
              {
                protocol: BigInt(1),
                pointer: "test pool metadata",
              },
              [account as Address],
            ],
          });
    
          if (!walletClient) {
            return;
          }
          // @ts-ignore
          const hash = await walletClient.writeContract(data.request);

          const transaction = await publicClient.waitForTransactionReceipt({
            hash: hash,
          });
          toast({
            title: "Pool Created",
            description: "Created pool  created successfully",
          });

        } catch (error) {
            return;
        }
      }
    
  return (
    <div className={cn("grid items-start gap-4 px-4 mx-4")}>
      <div className="grid gap-2">
        <Label htmlFor="info">Information</Label>
        <Input type="text" id="info" defaultValue="defaultValuye" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" defaultValue="1000" />
      </div>
      <Button variant="primary" onClick={onSubmit}>Save changes</Button>
    </div>
  )
}
