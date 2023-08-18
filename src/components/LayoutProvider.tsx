'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const isNotPrivatePage =
    pathName === '/login' ||
    pathName === '/register' ||
    pathName === '/verifyemail' ||
    pathName === '/resetpassword';

  const router = useRouter();

  const onLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/logout');
      toast.success(res.data.message);
      router.push('/login');
    } catch (e: any) {
      toast.error('logout failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Spinner />}
      <Toaster />
      {!isNotPrivatePage && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='header'>
          <h1>Next Auth {pathName}</h1>
          <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around' }}>
            <Link href='/'>Home</Link>
            <Link href='/profile'>profile</Link>
            <i className='ri-logout-box-r-line' onClick={onLogout}></i>
          </div>
        </div>
      )}
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </div>
  );
}

export default LayoutProvider;
