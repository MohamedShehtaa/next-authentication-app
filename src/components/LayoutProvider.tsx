'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicPage = pathName === '/login' || pathName === '/register';
  return (
    <div>
      {!isPublicPage && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Next Auth {pathName}</h1>
          <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around' }}>
            <Link href='/'>Home</Link>
            <Link href='/login'>Login</Link>
            <Link href='/register'>register</Link>
            <Link href='/profile'>profile</Link>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default LayoutProvider;
