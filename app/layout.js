import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit=Outfit({subsets:["latin"]})


export const metadata = {
  itle: "Track & Spend",
  description: "Mange your expenses easily with Track & Spend",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
