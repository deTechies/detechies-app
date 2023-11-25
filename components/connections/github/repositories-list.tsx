import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { DependenciesList } from "./dependencies-list";
import { RepositoryItem } from "./repository-item";
import { Dependency, Repository } from "./types";
RepositoryItem;

interface RepositoriesListProps {
  repos: Repository[];
  onImport: (owner: string, repoName: string) => void;
  dependencies: Dependency[];
}

export const RepositoriesList = ({
  repos,
  onImport,
  dependencies,
}: RepositoriesListProps) => (
  <div className="max-w-xl p-2">
    {dependencies.length == 0  && (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          {repos.map((repo) => (
            <RepositoryItem key={repo.name} repo={repo} onImport={onImport} />
          ))}
        </CommandList>
      </Command>
    )}
    
    <DependenciesList dependencies={dependencies} />
  </div>
);
