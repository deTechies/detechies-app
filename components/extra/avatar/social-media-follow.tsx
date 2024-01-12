import { Button } from "@/components/ui/button";
import { ReactElement } from "react";


interface SocialFollowProps {
    icon: ReactElement; // Assuming the icon is a React component like from 'lucide-react'
    platformName: string;
    onFollow: () => void;
  }
  
  export const SocialFollow = ({ icon, platformName, onFollow }: SocialFollowProps) => {
    return (
      <div className="flex gap-2 justify-between items-center">
        {icon}
        <h4>
          Follow @{platformName} on {platformName}
        </h4>
        <Button size="sm" className="text-sm" onClick={onFollow}>
          Follow +1 GEN
        </Button>
      </div>
    );
  };