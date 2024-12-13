import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "AIkya",
  description: "Where Ideas Create Impact",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Viga&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
