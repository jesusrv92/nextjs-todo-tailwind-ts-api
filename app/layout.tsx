import "./globals.css";

export const metadata = {
  title: "Next.js To-Do (TS)",
  description:
    "Simple To-Do with Next.js, Tailwind, TypeScript, and Next API routes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="min-h-screen text-slate-900 antialiased">
        <div className="mx-auto max-w-2xl p-6">{children}</div>
      </body>
    </html>
  );
}
