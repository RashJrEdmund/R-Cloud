"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Document } from "@/core/interfaces/entities";
import { isValidDate } from "@/core/utils/helpers";

interface Props {
  doc: Document | "root" | null;
}

interface SubContent {
  sub_field: string;
  sub_value: string;
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
        sub_content: (() =>
          _doc?.sharedState?.isShared
            ? [
                {
                  sub_field: "Access Type",
                  sub_value: _doc?.sharedState?.accessType,
                },
                {
                  sub_field: "Viewer Roles",
                  sub_value: _doc?.sharedState?.viewerRole,
                },
              ]
            : [])() as SubContent[],
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
              {(
                getData(doc) as {
                  field: string;
                  value: string;
                  sub_content?: SubContent[];
                }[]
              ).map(({ field, value, sub_content }) => (
                <DivCard
                  key={field}
                  className="my-1 w-full flex-col items-start justify-start gap-2"
                >
                  <DivCard className="w-full items-start justify-start gap-2">
                    <TextTag className="whitespace-nowrap">{field} :</TextTag>

                    <TextTag className="break-all text-app_blue">
                      {value}
                    </TextTag>
                  </DivCard>

                  <DivCard className="w-full flex-col items-start justify-start gap-2 pl-4">
                    {sub_content?.map(({ sub_field, sub_value }) => (
                      <DivCard
                        key={sub_field}
                        className="items-start justify-start gap-2"
                      >
                        <TextTag className="whitespace-nowrap">
                          {sub_field} :
                        </TextTag>

                        <TextTag className="break-all text-app_blue">
                          {sub_value}
                        </TextTag>
                      </DivCard>
                    ))}
                  </DivCard>
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
