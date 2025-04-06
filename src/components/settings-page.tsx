import { DeleteAccountSection } from "./delete-account-section";
import PageLayout from "./layout/page-layout";
import { SignOutSection } from "./signout-section";

export function SettingsPage() {
  return (
    <PageLayout title="Settings">
      <DeleteAccountSection />
      <SignOutSection />
    </PageLayout>
  );
}
