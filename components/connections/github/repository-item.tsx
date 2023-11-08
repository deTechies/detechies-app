import { CommandItem } from "@/components/ui/command";
import { Github } from "lucide-react";
import { Repository } from './types';

interface RepositoryItemProps {
  repo: Repository;
  onImport: (owner: string, repoName: string) => void;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo, onImport }) => {
    const handleClick = () => {
      onImport(repo.owner.login, repo.name);
    };
  
    return (
      <CommandItem
      onClick={() => window.alert("launch")}
      className="my-2 w-full hover:text-accent-secondary hover:bg-accent-secondary"
      onSelect={handleClick}
    >
      <Github className="mr-2 h-4 w-4 hover:animate-pulse" />
      <span className="my-2 hover:text-accent-secondary">{repo.name}</span>
    </CommandItem>
    );
  };
  

