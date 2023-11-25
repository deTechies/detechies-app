
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

export default  function RequestNFTModal() {
  

  
    //const data = await getAllAchievements();
    const data = null;
    
    if(!data) return null;

    return (
        <Dialog>
        <DialogTrigger>
            <Badge variant="accent">Add</Badge>    
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Achievement</DialogTitle>
            <DialogDescription>
                {data && <RequestNftForm achievements={data}/>}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    )
    }
    
