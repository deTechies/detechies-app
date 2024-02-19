"use client";

import { usePathname } from "next/navigation";

export default function WorkTitle({
  username,
  lang,
}: {
  username: string;
  lang: any;
}) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  let title, subTitle;

  switch (lastSegment) {
    case "survey":
      title = lang.project.evaluate.evaluate_specialty;
      subTitle = lang.project.evaluate.evaluate_specialty_description;
      break;
    case "feedback":
      title = lang.project.evaluate.evaluate_propensity;
      subTitle = lang.project.evaluate.evaluate_propensity_description;
      break;
    case "swot":
      title = lang.project.evaluate.last_feedback;
      subTitle = lang.project.evaluate.last_feedback_description;
      break;
    default:
      title = lang.project.evaluate.evaluate_performance;
      subTitle = `${lang.project.evaluate.evaluate_performance_description} ${username} ${lang.project.evaluate.evaluate_performance_description2}`;
  }

  return (
    <header className="mb-10 text-center">
      <h2 className="mb-4 text-heading_m">{title}</h2>
      <h5 className="text-title_m text-text-secondary">{subTitle}</h5>
    </header>
  );
}
