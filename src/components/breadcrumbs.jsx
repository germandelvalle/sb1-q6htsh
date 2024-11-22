"use client"

import { House } from 'lucide-react';
// components/Breadcrumbs.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Divide la ruta en segmentos y filtra los vacíos y el segmento "backoffice"
  const pathSegments = pathname.split('/').filter((segment) => segment && segment !== 'backoffice');

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-500 capitalize mb-5 mt-2">
        <li className='flex gap-2'>
          <Link href="/backoffice/dashboard" className="text-primary hover:underline flex items-center gap-1"><House size={ 15 }/> Home</Link>
          <span> / </span>
        </li>
        {pathSegments.map((segment, index) => {
          // Construir la URL acumulativa hasta el segmento actual
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          
          // Reemplazar guiones por espacios en el nombre del segmento
          const displayName = decodeURIComponent(segment).replace(/-/g, ' ');

          return (
            <li key={index}>
              {index < pathSegments.length - 1 ? (
                <>
                  <Link href={href} className="text-blue-500 hover:underline">
                    {displayName}
                  </Link>
                  <span> / </span>
                </>
              ) : (
                // Último elemento sin enlace
                <span className="text-gray-500">{displayName}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
