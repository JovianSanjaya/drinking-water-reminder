import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Water Reminder 💧",
  description: "Stay hydrated with cute reminders!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
