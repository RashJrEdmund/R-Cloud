"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { APP_CONFIG } from "@/core/config/app";
import { Copy, Github, Linkedin, Mail, UserRoundCheck, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Socials = [
  {
    username: "portfolio",
    icon: UserRoundCheck,
    url: "https://rash-edmund.vercel.app",
  },
  {
    username: "rashjredmund",
    icon: Github,
    url: "https://github.com/rashjredmund",
  },
  {
    username: "orashus",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/orashus/",
  },
  {
    username: "orashus",
    icon: X,
    url: "https://twitter.com/orashus",
  }
];

export default function Footer() {
  const handleEmailCopy = () => {
    navigator.clipboard.writeText(APP_CONFIG.my_email).then(() => {
      toast("Email copied to clipboard", {
        description: "do write me 🤗",
      });
    });
  };

  return (
    <DivCard
      as="footer"
      className="flex min-h-[400px] w-full flex-col items-center justify-center gap-8"
    >
      <DivCard className="w-primary_app_width flex-col items-start justify-between gap-6 md:flex-row">
        <DivCard className="flex-col items-start font-semibold">
          <TextTag
            as="h3"
            className="flex-wrap items-start justify-start break-all text-sm"
          >
            This is the main application in the{" "}
            <Link
              className="inline w-fit cursor-pointer whitespace-nowrap border-b border-b-app_blue text-app_blue"
              href={APP_CONFIG.r_apps_url + "?from=" + APP_CONFIG.app_link}
            >
              r-apps
            </Link>{" "}
            Collection
          </TextTag>

          <TextTag className="text-sm">
            A testament of my abilities 💪🏾 🚀
          </TextTag>
        </DivCard>

        <DivCard>
          <TextTag className="text-sm">
            Designed and built with 🤍 💙 by Orashus(Rash)
          </TextTag>
        </DivCard>

        <DivCard className="flex-col items-start">
          <TextTag className="text-sm font-semibold">Find Rash</TextTag>

          <TextTag className="my-1 w-fit text-sm">
            <TextTag className="flex-nowrap whitespace-nowrap text-sm">
              <Mail size={15} />
              {APP_CONFIG.my_email}

              <Copy
                size={15}
                className="ml-2 cursor-pointer text-app_text"
                onClick={handleEmailCopy}
              />
            </TextTag>
          </TextTag>

          {Socials.map(({ username, url, icon: Icon }) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="my-1 w-fit text-sm text-app_blue underline"
            >
              <TextTag className="flex-nowrap whitespace-nowrap text-sm text-app_blue">
                <Icon size={15} />@{username}
              </TextTag>
            </Link>
          ))}
        </DivCard>
      </DivCard>

      <DivCard className="w-primary_app_width text-center text-sm text-app_text_grayed">
        &copy; {new Date().getFullYear()} | R - Cloud From r - apps
        <br />
        All Rights Reserved
      </DivCard>
    </DivCard>
  );
}
