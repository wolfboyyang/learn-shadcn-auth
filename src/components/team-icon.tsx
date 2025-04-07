import { Avatar, AvatarImage, Typography } from "@stackframe/stack-ui";
import { type Team } from "@stackframe/stack";

export function TeamIcon({ team }: { team: Team }) {
  if (team.profileImageUrl) {
    return (
      <Avatar className="min-w-6 min-h-6 max-w-6 max-h-6 rounded">
        <AvatarImage src={team.profileImageUrl} alt={team.displayName} />
      </Avatar>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-w-6 min-h-6 max-w-6 max-h-6 rounded bg-zinc-200">
        <Typography className="text-zinc-800 dark:text-zinc-800">
          {team.displayName.slice(0, 1).toUpperCase()}
        </Typography>
      </div>
    );
  }
}
