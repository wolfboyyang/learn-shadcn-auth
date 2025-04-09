import { TeamPage } from "@/components/team-page";

export default async function TeamView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeamPage id={id} />;
}
