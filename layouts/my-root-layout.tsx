"use client";

import { RecoilRoot } from "recoil";
import InterfaceLayout from "./interface-layout";
import { ThemeProvider } from "next-themes";
import { SupabaseProvider } from "@/context/supabase-context";
import { ModalProvider } from "@/components/modals/modal-controller";
import { CartProvider } from "@/context/cart-context";

export default function MyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <SupabaseProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <ModalProvider>
              <InterfaceLayout>{children}</InterfaceLayout>
            </ModalProvider>
          </CartProvider>
        </ThemeProvider>
      </SupabaseProvider>
    </RecoilRoot>
  );
}
