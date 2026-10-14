import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'Smith Services | Limpieza de Fosas Sépticas, Destape de Alcantarillado y Baños Químicos en Chillán',
  description:
    'Limpieza de fosas sépticas, destape de alcantarillado y desagües, limpieza de tuberías, arriendo y venta de baños químicos y obras civiles en Chillán y sus alrededores.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
