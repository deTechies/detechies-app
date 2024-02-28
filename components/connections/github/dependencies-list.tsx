import Image from "next/image";
import { Dependency } from "./types";

interface DependenciesListProps {
  dependencies: Dependency[];
}
export const DependenciesList = ({ dependencies }: DependenciesListProps) => (
  <section className="max-h-[250px] overflow-auto">
    <div className="flex flex-col">
      {dependencies.map((dependency, index) => (
        <DependencyItem key={index} dependency={dependency} />
      ))}
    </div>
  </section>
);

export const DependencyItem = ({ dependency }: { dependency: Dependency }) => (
  <div className="flex gap-2 bg-background-layer-1 py-2 rounded-[6px] m-1 hover:outline hover:outline-accent-primary hover:bg-accent-secondary px-2">
    <div>
      <Image
        src={`/icons/github.png`}
        alt={dependency.name}
        width={32}
        height={32}
      />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-label_m">{dependency.name}</span>
      <span className="text-text-secondary text-label_s">
        {dependency.version && `version ${dependency.version}`}
      </span>
    </div>
  </div>
);
