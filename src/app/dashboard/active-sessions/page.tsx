import { ActiveSessionsPage } from "@/components/active-sessions-page";
import { ActiveSessionsPageSkeleton } from "@/components/active-sessions-page-skeleton";
import { Suspense } from "react";

export default function Settings() {
  return (
    <Suspense fallback={<ActiveSessionsPageSkeleton />}>
      <ActiveSessionsPage />
    </Suspense>
  );
}
