import { useTranslations } from "next-intl";
import PageLayout from "./layout/page-layout";
import { Skeleton } from "./ui/skeleton";

export function ActiveSessionsPageSkeleton() {
  const t = useTranslations("ActiveSessionsPage");
  return (
    <PageLayout title={t("title")}>
      <Skeleton className="h-6 w-48 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-[200px] w-full mt-1 rounded-md" />
    </PageLayout>
  );
}
