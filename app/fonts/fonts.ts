import localFont from "next/font/local";


export const satoshi = localFont({
    src: "./Satoshi-Variable.ttf",
    variable: "--font-satoshi",
    weight: "100 900",
});

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});