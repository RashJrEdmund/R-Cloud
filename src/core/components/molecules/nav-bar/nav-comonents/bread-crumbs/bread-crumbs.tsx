"use client";

import { flex_template } from "@/core/ui/theme";
import { TextTag } from "@/components/atoms";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocStore } from "@/providers/stores/zustand";
import { shortenText } from "@/core/utils/helpers";
import { LoaderCircle } from "lucide-react";

interface Props {
  //
}

const StyledBreadCrumbs = styled.div`
  ${flex_template};
  gap: 0;

  @media only screen and (max-width: 880px) {
    display: none;
  }
`;

export default function BreadCrumbs({}: Props) {
  const pathname = usePathname();

  const { currentFolder, loadingCurrentFolder } = useDocStore();

  if (loadingCurrentFolder && currentFolder !== "root")
    return (
      <StyledBreadCrumbs>
        <Link href="/r-drive">
          <TextTag className="ml-1 cursor-pointer">/ r-drive</TextTag>
        </Link>
        <Link href="/r-drive/root">
          <TextTag className="ml-1 cursor-pointer">/ root</TextTag>
        </Link>
        <TextTag className="ml-1 cursor-default">
          / <LoaderCircle size={20} className="animate-spin text-app_blue" />
        </TextTag>
      </StyledBreadCrumbs>
    );

  let currentLink = "";

  const arr_crumbs: string[] = []; // to keep track of links

  const crumbs = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, i) => {
      currentLink += `/${crumb}`;

      arr_crumbs.push(crumb);

      let add_trails = false;

      let route_crumb = crumb;

      if (
        i > 1 &&
        arr_crumbs[i - 1] &&
        arr_crumbs[i - 1] === "root" &&
        currentFolder !== "root"
      ) {
        if (currentFolder.parent_id !== "root") {
          // meaning you are in a sub-directory that's not immediately under root dir
          add_trails = true;
        }

        route_crumb = currentFolder.name;
      }

      return (
        <Link key={crumb + i} href={String(currentLink)}>
          <TextTag className="cursor-pointer">
            / {add_trails ? "... /" : ""} {shortenText(route_crumb, 15)}
          </TextTag>
        </Link>
      );
    });

  /*
    const crumbs = pathname.split('/')
      .filter(crumb => crumb !== '')
      .map((crumb, i) => {
        currentLink += `/${crumb}`;

        return (
          <Link key={crumb + i} href={String(currentLink)}>
            <TextTag className="cursor-pointer">
              / {crumb}
            </TextTag>
          </Link>
        );
      });
  */

  return <StyledBreadCrumbs>{crumbs}</StyledBreadCrumbs>;
}
