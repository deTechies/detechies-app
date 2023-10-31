"use client"
import { RequestNftForm } from "@/components/form/request-nft-form";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RequestNFTModal() {

    return (
        <Dialog>
        <DialogTrigger>
            <Badge variant="accent">Add</Badge>    
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Achievement</DialogTitle>
            <DialogDescription>
                <RequestNftForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    )
    }
    
