import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../../contexts/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
