import { ThemeProvider } from "@/lib/theme-provider";

export default function MyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className=" flex flex-col min-h-screen w-full bg-light-300 dark:bg-dark ">
        {children}
      </div>
    </ThemeProvider>
  );
}
