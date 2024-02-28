import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { DependenciesList } from "./dependencies-list";
import { LanguageList } from "./language-list";
import { RepositoryItem } from "./repository-item";
import { Dependency, LanguagePercentage, Repository } from "./types";
RepositoryItem;

interface RepositoriesListProps {
  repos: Repository[];
  onImport: (owner: string, repoName: string) => void;
  data: {languages: LanguagePercentage[], packages:Dependency[]};
}

export const RepositoriesList = ({
  repos,
  onImport,
  data,
}: RepositoriesListProps) => (
  <div className="max-w-xl p-2">
    {data && data.packages?.length == 0  && (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          {repos.map((repo) => (
            <RepositoryItem key={repo.name} repo={repo} onImport={onImport} />
          ))}
        </CommandList>
      </Command>
    )}
    {
      data?.packages?.length > 0 && (
        <>
        <DependenciesList dependencies={data.packages} />
        <LanguageList languages={data.languages}/>
        </>
      )
    }
  </div>
);
