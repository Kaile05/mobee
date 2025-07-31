
import "./globals.css";
import Nav from "@/components/Nav";
import { Montserrat, Poppins } from 'next/font/google';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose the weights you need
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: "MoBee",
  description: "Catch the Reel Buzz..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${poppins.className}`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
