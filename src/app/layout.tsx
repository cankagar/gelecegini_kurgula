import type { Metadata } from "next";
import { cookies } from "next/headers";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Outfit, Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/widgets/site-chrome/SiteChrome";
import { ClickSpark } from "@/shared/ui/click-spark";
import { getMeServer } from "@/entities/user";
import { hasValidAccessToken } from "@/shared/lib/auth-token";
import { QueryProvider } from "./query-provider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "PayaSTEM | Geleceğini Kurgula",
  description: "Gençler için bilim, teknoloji, mühendislik ve matematik odaklı eğitim ve topluluk platformu.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  if (hasValidAccessToken(cookieStore.get("access_token")?.value)) {
    await queryClient.prefetchQuery({
      queryKey: ["currentUser"],
      queryFn: () => getMeServer(cookieStore.toString()),
    });
  }

  return (
    <html lang="tr">
      <body
        className={`${jakarta.variable} ${outfit.variable} ${newsreader.variable} bg-bg font-sans`}
      >
        <QueryProvider dehydratedState={dehydrate(queryClient)}>
          <ClickSpark />
          <SiteChrome>{children}</SiteChrome>
        </QueryProvider>
      </body>
    </html>
  );
}
