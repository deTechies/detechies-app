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
  <div className="flex gap-2 items-center py-2 rounded-[6px] m-1 hover:outline hover:outline-primary-active hover:bg-primary-clarity px-2">
    <div>
      <Image
        src={`/icons/github.png`}
        alt={dependency.name}
        width={32}
        height={32}
      />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-md">{dependency.name}</span>
      <span className="text-gray-600 text-sm ">
        {dependency.version && `version ${dependency.version}`}
      </span>
    </div>
  </div>
);
