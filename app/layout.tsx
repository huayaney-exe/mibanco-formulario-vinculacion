import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PasswordGate } from '@/components/PasswordGate';

export const metadata: Metadata = {
  title: 'Formulario de Vinculación - MIBANCO',
  description: 'Formulario de vinculación y solicitud de productos MIBANCO Colombia',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  );
}
