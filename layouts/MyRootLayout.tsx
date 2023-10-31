import { ThemeProvider } from "@/lib/theme-provider";
import Header from "@/components/sections/header";
import Sidebar from "@/components/sections/sidebar";

export default function MyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className=" flex min-h-screen w-full flex-col bg-light-300 dark:bg-dark-100 ">
        <Header />
        <div className="flex flex-1">
						<Sidebar	/>			
						{children}</div>
      </div>
    </ThemeProvider>
  );
}
