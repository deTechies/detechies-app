import Feed from "@/components/feed/feed";

export default function ProjectFeedPage({
  params,
}: {
  params: { id: string };
}) {

  return <Feed topic={`/detechies/1/project-${params.id}/proto`} id={params.id}/>;
}
 