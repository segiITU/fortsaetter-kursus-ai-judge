import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dommer-GPT',
  description: 'Vurder dine AI prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
