import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <header>
          <nav className="navbar navbar-dark bg-dark p-3">
            <div className="container">
              <a className="navbar-brand text-white" href="/">To-do App</a>
              <div>
                <a className="btn btn-outline-light me-2" href="/login">Connexion</a>
                <a className="btn btn-outline-light" href="/signup">Inscription</a>
              </div>
            </div>
          </nav>
        </header>

        {children} {/* Ici s’affiche le contenu de chaque page */}
        <footer>Je suis le footer</footer>
      </body>
    </html>
  );
}
