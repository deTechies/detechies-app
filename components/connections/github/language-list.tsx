import { LanguagePercentage } from "./types";

interface LanguageListProps {
  languages: LanguagePercentage[];
}
export const LanguageList = ({ languages }: LanguageListProps) => (
  <section className="max-h-[40vh] overflow-auto">
    <div className="flex flex-col">
      {languages.map((language, index) => (
        <div key={index}>
          <span key={index}>{language.name}</span>
          <span className="text-text-secondary text-label_s">
            {` ${language.percentage}%`}
          </span>
        </div>
      ))}
    </div>
  </section>
);
