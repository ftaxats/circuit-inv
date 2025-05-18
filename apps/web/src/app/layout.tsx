import {
  JetBrains_Mono,
  Instrument_Serif,
  Instrument_Sans,
  Urbanist,
  Bricolage_Grotesque,
  Inter,
} from "next/font/google";
import {
  ReactScanProvider,
  JotaiProvider,
  PostHogProvider,
  OneDollarStatsProvider,
  OpenPanelProvider,
} from "@/providers";
import { metadata as websiteMetadata, defaultWebsiteViewport } from "@/constants/meta-data";
import { TOAST_ICONS, TOAST_OPTIONS } from "@/constants/toast";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "./globals.css";
import "./fonts.css";

// Geist Sans (using Inter as a fallback)
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Geist Mono (using JetBrains Mono as a fallback)
const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// JetBrains Mono
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Instrument Serif
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

// Instrument Sans
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Urbanist
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Bricolage Grotesque
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = websiteMetadata;
export const viewport = defaultWebsiteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          jetBrainsMono.variable,
          instrumentSerif.variable,
          instrumentSans.variable,
          urbanist.variable,
          bricolageGrotesque.variable,
          "antialiased",
        )}
      >
        <OpenPanelProvider>
          <OneDollarStatsProvider>
            <PostHogProvider>
              <JotaiProvider>
                <ThemeProvider attribute="class" defaultTheme="system" storageKey="invoice-theme">
                  <ReactScanProvider />
                  <Toaster
                    richColors
                    position="top-right"
                    toastOptions={TOAST_OPTIONS}
                    icons={TOAST_ICONS}
                    visibleToasts={4}
                  />
                  {children}
                </ThemeProvider>
              </JotaiProvider>
            </PostHogProvider>
          </OneDollarStatsProvider>
        </OpenPanelProvider>
      </body>
    </html>
  );
}
