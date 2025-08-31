import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Apprendre Next.js pas à pas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header /> {/* notre header client */}
        {children}
        <footer>Je suis le footer</footer>
      </body>
    </html>
  );
}
