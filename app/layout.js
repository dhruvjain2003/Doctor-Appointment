import { Montserrat } from 'next/font/google';
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import ChatSupport from './components/ChatSupport/ChatSupport';
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: "Medcare",
  description: "Your personal health assistant",
  icons:{
    icon:"/images/frame.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Toaster position="top-right" reverseOrder={false} />
        <AuthProvider>  
          <Header />
          <main className="container">{children}</main>
          <ChatSupport />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
