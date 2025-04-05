"use client";

import { Typography } from "@stackframe/stack-ui";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function EditableText(props: {
  value: string;
  onSave?: (value: string) => void | Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(props.value);
  const t = useTranslations("EditableText");

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <Input
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
          <Button
            size="sm"
            onClick={async () => {
              await props.onSave?.(editingValue);
              setEditing(false);
            }}
          >
            {t("Save")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setEditingValue(props.value);
              setEditing(false);
            }}
          >
            {t("Cancel")}
          </Button>
        </>
      ) : (
        <>
          <Typography>{props.value}</Typography>
          <Button onClick={() => setEditing(true)} size="icon" variant="ghost">
            <Edit className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}
