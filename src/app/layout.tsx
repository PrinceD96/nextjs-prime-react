"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { usePathname, useRouter } from "next/navigation";
import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { push } = useRouter();
  const pathname = usePathname();
  const initialIndex = pathname === "/" ? 0 : 1;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const routes = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
  ];

  const items = [
    { label: "Home", icon: "pi pi-home" },
    { label: "Insights", icon: "pi pi-chart-line" },
  ];

  const handleTabChange = (e: TabMenuTabChangeEvent) => {
    setActiveIndex(e.index);
    push(routes[e.index].path);
  };

  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={inter.className}>
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
          />
          {children}
        </body>
      </PrimeReactProvider>
    </html>
  );
}
