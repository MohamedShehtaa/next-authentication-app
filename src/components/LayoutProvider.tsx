'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicPage = pathName === '/login' || pathName === '/register';
  return (
    <div>
      <Toaster />
      {!isPublicPage && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='header'>
          <h1>Next Auth {pathName}</h1>
          <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around' }}>
            <Link href='/'>Home</Link>
            <Link href='/profile'>profile</Link>
            <i className='ri-logout-box-r-line'></i>
          </div>
        </div>
      )}
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </div>
  );
}

export default LayoutProvider;
