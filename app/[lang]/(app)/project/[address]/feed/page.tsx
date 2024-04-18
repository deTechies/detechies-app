import Feed from "@/components/feed/feed";

export default function ProjectFeedPage({
  params,
}: {
  params: { address: string };
}) {

  return <Feed topic={`/detechies/1/project-${params.address}/proto`} id={params.address}/>;
}
 