"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Copy, Github, Linkedin, Mail, Twitter, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Socials = [
  {
    username: "orashus",
    icon: X,
    url: "https://twitter.com/orashus",
  },
  {
    username: "orashus",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/orashus/",
  },
  {
    username: "rashjredmund",
    icon: Github,
    url: "https://github.com/rashjredmund",
  }
];

const R_APPS_URL = "#";

const MY_EMAIL = "orashusedmund@gmail.com";

export default function Footer() {
  const handleEmailCopy = () => {
    navigator.clipboard.writeText(MY_EMAIL)
      .then(() => {
        toast("Email copied to clipboard", {
          description: "do write me 🤗"
        });
      });
  };

  return (
    <DivCard as="footer" className="w-full min-h-[400px] flex flex-col items-center justify-center gap-8">
      <DivCard className="w-primary_app_width justify-between items-start gap-6 flex-col md:flex-row">
        <DivCard className="flex-col items-start font-semibold">
          <TextTag as="h3" className="break-all flex-wrap items-start justify-start text-sm">
            This is the main application in the {" "}
            <Link
              className="inline w-fit text-app_blue border-b border-b-app_blue cursor-pointer whitespace-nowrap"
              target="_blank"
              href={R_APPS_URL}
            >
              r-apps
            </Link> {" "}
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
          <TextTag className="text-sm font-semibold">
            Find Rash
          </TextTag>

          <TextTag
            className="text-sm w-fit my-1"
          >
            <TextTag className="flex-nowrap whitespace-nowrap text-sm">
              <Mail size={15} />
              {MY_EMAIL}

              <Copy
                size={15}
                className="text-app_text ml-2"
                onClick={handleEmailCopy}
              />
            </TextTag>
          </TextTag>

          {
            Socials.map(({ username, url, icon: Icon }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                className="text-sm w-fit underline text-app_blue my-1"
              >
                <TextTag className="flex-nowrap whitespace-nowrap text-sm text-app_blue">
                  <Icon size={15} />
                  @{username}
                </TextTag>
              </Link>
            ))
          }
        </DivCard>
      </DivCard>

      <DivCard className="w-primary_app_width text-app_text_grayed text-center text-sm">
        &copy; {new Date().getFullYear()} | R - Cloud From r - apps

        <br />

        All Rights Reserved
      </DivCard>
    </DivCard>
  )
}