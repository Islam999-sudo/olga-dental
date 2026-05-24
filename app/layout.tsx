import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-zinc-50 text-zinc-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}