import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider } from "@/providers/sidebar-provider";
import dynamic from "next/dynamic";
import "./globals.css";

export const metadata: Metadata = {
  title: "The City Flyers",
  description: "Fly high, reach the sky",
};

// Dynamically import Sidebar and Header for better performance
const Header = dynamic(() => import("@/components/header/Header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/sidebar/Sidebar"), { ssr: false });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 w-0">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
