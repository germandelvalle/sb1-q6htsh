import localFont from 'next/font/local';
import './../globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../../components/app-sidebar';
import Breadcrumbs from '@/src/components/breadcrumbs';
import { NavbarMobile } from '@/src/components/navbar-mobile';
import Image from 'next/image';

const geistSans = localFont({
  src: './../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Login Boom Tool',
  description: 'Digifianz - Boom Tool',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          <div className="container px-3 md:px-6 lg:px-8 mx-auto">
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <div className='flex items-center gap-2 justify-center mb-6 mt-2'>
                <Image
                  src="/images/BoomLogo.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                /> 
                </div>
            
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
