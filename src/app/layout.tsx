import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import { Header } from "@/components/Layouts/header";
import { Footer } from "@/components/Layouts/footer";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Self Service Infra - Next.js Dashboard Kit",
    default: "Self Service Infra - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex flex-col min-h-screen bg-white dark:bg-[#020d1a]">
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <Header />
          {/* Use flex-1 on a wrapper to push footer down, and ensure sidebar/content are between header/footer */}
          <div className="flex-1 flex flex-row bg-white dark:bg-[#020d1a] min-h-0">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-0">
              {/* children will fill the remaining space between header and footer */}
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
