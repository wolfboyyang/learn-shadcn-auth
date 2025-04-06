"use client";

import { EditableText } from "@/components/elements/editable-text";
import { Section } from "@/components/elements/section";
import PageLayout from "@/components/layout/page-layout";
import { ProfileImageEditor } from "@/components/profile-image-editor";
import { useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";

export default function ProfileViewPage() {
  const t = useTranslations("ProfilePage");
  const user = useUser({ or: "redirect" });
  return (
    <PageLayout>
      <div className="space-y-4">
        <Section title={t("User name")} description={t("User name tips")}>
          <EditableText
            value={user.displayName || ""}
            onSave={async (newDisplayName) => {
              await user.update({ displayName: newDisplayName });
            }}
          />
        </Section>

        <Section
          title={t("Profile image")}
          description={t("Profile image tips")}
        >
          <ProfileImageEditor
            user={user}
            onProfileImageUrlChange={async (profileImageUrl) => {
              await user.update({ profileImageUrl });
            }}
          />
        </Section>
      </div>
    </PageLayout>
  );
}
