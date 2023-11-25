"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import IPFSImageLayer from "../ui/layer";
import { Switch } from "../ui/switch";

export default function PersonItem({
    src,
    alt,
    name,
    job,
    tba,
  }: {
    src: string[];
    alt: string;
    name: string;
    job: string;
    tba: string;
  }) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const result = searchParams.get("selected");
    const listMembers = result?.split(",")
    
    const changeValue = (value: boolean, tba: string) => {
      console.log(value, tba);
   
      
      if(value){    
        console.log(tba)
        if(tba){
            console.log(value)
            
            if(result){
                router.push(pathName + `?selected=${result},${tba}`)
            }else{
                router.push(pathName + `?selected=${tba}`)
            }
        }
      }
    };
    return (
      <article className="flex justify-between items-center p-4 ">
        <figure className="flex gap-4">
          <div className="relative w-12 h-12 rounded-full">
              <IPFSImageLayer hashes={src} />
          </div>
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-muted-foreground">{job}</p>
          </div>
        </figure>
  
        <Switch
            disabled={!tba}
            checked={listMembers?.includes(tba)}
             onCheckedChange={(value) => changeValue(value, tba)}
        />
      </article>
    );
  }
  