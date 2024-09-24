"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Document } from "@/core/interfaces/entities";
import { isValidDate } from "@/core/utils/helpers";

interface Props {
  doc: Document | "root" | null;
}

const validateDate = (str: string) => {
  if (!isValidDate(str)) return "Date could not be retrieved";

  return new Date(str).toDateString();
};

function DocDetailsSheetContent({ doc }: Props) {
  const isRootFolder = typeof doc === "string";

  const getData = (_doc: Document | null) => {
    const isFolder = _doc?.type === "FOLDER";

    const _ = [
      {
        field: "Doc type",
        value: _doc?.type,
      },
      {
        field: "Date created",
        value: validateDate((_doc?.createdAt as string) || ""),
      },
      {
        field: "Last Modified",
        value: validateDate((_doc?.updatedAt as string) || ""),
      },
      {
        field: "Size",
        value: _doc?.capacity.size,
      },
      {
        field: "Is Shared",
        value: String(!!_doc?.sharedState?.isShared),
      },
    ];

    return isFolder
      ? [
        ..._,
        {
          field: "Length",
          value: _doc?.capacity.length,
        },
      ]
      : [
        ..._,
        {
          field: "Original filename",
          value: _doc?.filename,
        },
        {
          field: "Ext",
          value: _doc?.extension,
        },
        {
          field: "Content Type",
          value: _doc?.content_type,
        },
      ];
  };

  return (
    <DivCard className="w-full flex-col justify-start">
      {(() => {
        if (isRootFolder) return "root folder data";

        const isFolder = doc?.type === "FOLDER";

        return (
          <>
            <DivCard className="min-h-[min(500px,_70vh)] w-full flex-col justify-start">
              {getData(doc).map(({ field, value }) => (
                <DivCard key={field} className="my-1 w-full items-start justify-start gap-2">
                  <TextTag className="whitespace-nowrap">{field} :</TextTag>

                  <TextTag className="break-all text-app_blue">{value}</TextTag>
                </DivCard>
              ))}
            </DivCard>

            <DivCard className="mt-4 w-full gap-2">
              {isFolder ? (
                <>
                  <Button variant="black" disabled className="w-full">
                    Create achieve
                  </Button>

                  <Button variant="black" disabled className="w-full">
                    Hide Folder
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="blued" disabled className="w-full">
                    Download File
                  </Button>

                  <Button variant="blued" disabled className="w-full">
                    Copy File
                  </Button>
                </>
              )}
            </DivCard>
          </>
        );
      })()}
    </DivCard>
  );
}

export { DocDetailsSheetContent };
