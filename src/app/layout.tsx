import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ReactQueryProvider from "@/react-query";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recordify",
  description: "Share AI powered videos with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning >
        <body suppressHydrationWarning className={`${manrope.className} bg-[#171717]`}>
          <ThemeProvider attribute={"class"} defaultTheme="dark" disableTransitionOnChange>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
