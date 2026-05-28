import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-900 antialiased transition-colors duration-500 dark:bg-[#071412] dark:text-white">
        <ThemeProvider>
          <ScrollToTop />

          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}