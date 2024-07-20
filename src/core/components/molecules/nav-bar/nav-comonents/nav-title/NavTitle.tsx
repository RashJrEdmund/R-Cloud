"use client";

import { useUserStore } from "@/providers/stores/zustand";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

interface Props { };

export default function NavTitle({ }: Props) {
  const [navProperties, setNavProperties] = useState<{
    route_name: string;
    route_url: string;
  }>({ route_name: "...", route_url: "" });

  const { currentUser } = useUserStore();

  useLayoutEffect(() => {
    if (currentUser)
      setNavProperties({ route_name: "R Drive", route_url: "/r-drive" });
    else setNavProperties({ route_name: "R Cloud", route_url: "/" });
  }, [currentUser]);

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Link
        href={navProperties.route_url}
        className="inline-block max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {navProperties.route_name}
      </Link>
    </section>
  );
}
