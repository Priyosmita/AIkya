// app/layout.js
"use client"; // Add this directive at the top to mark it as a Client Component

import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import "./globals.css";

// Define the props interface
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>AIkya</title>
        <link rel="icon" href="/favicon.ico" sizes='any' />  {/* fav icon */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
};

export default Layout;