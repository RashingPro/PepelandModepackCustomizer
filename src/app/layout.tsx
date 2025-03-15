import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import {ReactNode} from "react";

const inter = Inter({subsets: ["cyrillic"]})

export const metadata: Metadata = {
  title: "Pepeland Modepack Customizer",
  description: "Добавить в сборку только нужные тебе компоненты еще никогда не было так просто!",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <html lang={"ru"}>
        <body className={`${inter.className} antialiased`}>
            {children}
        </body>
    </html>
}
