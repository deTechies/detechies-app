
import { Dependency } from "./types";

interface DependenciesListProps {
    dependencies: Dependency[];
  }
  export const DependenciesList = ({ dependencies }: DependenciesListProps) => (
    <section className="max-h-[40vh] overflow-auto py-2">
      <h1>Dependencies total: {dependencies.length}</h1>
      <ul>
        {dependencies.map((dependency, index) => (
          <li
            className="my-2 bg-background-layer-1 py-2 rounded-[6px] text-text-primary hover:text-accent-primary"
            key={index}
          >
            {dependency.toString()}
          </li>
        ))}
      </ul>
    </section>
  );
  