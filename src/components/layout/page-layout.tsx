import { Typography } from "@stackframe/stack-ui";

export default function PageLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <>
      <div className="mt-4 mb-6">
        <Typography type="h4" className="font-semibold">
          {title}
        </Typography>
        {description && (
          <Typography variant="secondary" type="label">
            {description}
          </Typography>
        )}
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </>
  );
}
