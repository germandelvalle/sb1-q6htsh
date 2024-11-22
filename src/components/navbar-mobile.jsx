"use client"

import { Menu } from 'lucide-react';
import Image from 'next/image';

export function NavbarMobile() {

  const handleButtonClick = () => {
    const sidebarTrigger = document.getElementById('sidebarTrigger');
    if (sidebarTrigger) {
      sidebarTrigger.click(); // Simula el clic en el elemento con id="sidebarTrigger"
    }
  };

  return (
    <>
    <nav className="flex items-center justify-between flex-wrap p-4 md:hidden bg-primary fixed z-10 w-full">
      <Image src="/images/BoomLogo.svg" alt="Boom" width={40} height={40} />
      <Image src="/images/Digifianz-logo-web.svg" alt="Digifianz" width={150} height={40} />
      <Menu size={ 38 } className='text-white' onClick={handleButtonClick} />
    </nav>
    
    <div className="md:hidden" style={{ height: '100px' }}></div>
    </>
  );
}
