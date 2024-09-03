import "./globals.css";
import { inter } from "@/core/ui/fonts";
import { Metadata } from "next";
import { ReactQueryClientProvider } from "@/features/react-query";
import { Toaster } from "sonner";
import { AppWrapper } from "@/providers/guards";
import { UploadModalContextProvider } from "@/providers/stores/context";
import { LoaderCircle } from "lucide-react";

const appDescription =
  "Cloud storage provider and progressive web application. Upload, store, organize, manage and download files";

export const metadata: Metadata = {
  title: {
    template: "%s | R - Cloud",
    default: "R - Cloud",
  },
  description: "could storage service app",
  metadataBase: new URL("https://r-cloud.vercel.app"),
  keywords: [
    "r-cloud",
    "r cloud",
    "could",
    "service",
    "storage",
    "google-drive",
    "Roger",
    "Rash",
    "R",
  ],
  manifest: "/manifest.json",
  authors: [
    {
      url: "https://twitter.com/orashus",
      name: "Rash Edmund",
    },
  ],
  openGraph: {
    type: "website",
    description: appDescription,
    siteName: "R - cloud",
    title: {
      template: "%s | R - Cloud",
      default: "R - Cloud",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "R - Cloud",
    // startupImage: []
  },
  twitter: {
    card: "summary",
    creator: "orashus",
    description: appDescription,
    title: {
      template: "%s | R - Cloud",
      default: "R - Cloud",
    },
  },
  verification: {
    google: "3pw-3jzAM3jeEsoTHZoweK_3Kg05EKuTHrkclUUSvTs", // got it from here https://search.google.com/search-console/welcome?utm_source=about-page
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#5588ff" />
      </head>

      <body className={inter.className}>
        <ReactQueryClientProvider>
          <AppWrapper>
            <UploadModalContextProvider>
              <Toaster
                richColors
                pauseWhenPageIsHidden
                icons={{
                  loading: (
                    <LoaderCircle
                      className="animate-spin text-app_blue"
                      size={18}
                    />
                  ),
                }}
              />

              <>{children}</>
            </UploadModalContextProvider>
          </AppWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
