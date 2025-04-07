import { TeamPage } from "@/components/team-page";

export default async function TeamView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return <TeamPage id={id} />;
}
