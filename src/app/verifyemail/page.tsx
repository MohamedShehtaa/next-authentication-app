'use client';

import Spinner from '@/components/Spinner';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default async function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const token = typeof window !== 'undefined' ? window.location.search.split('=')[1] : null;

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className='flex h-screen justify-center items-center'>
      {loading && <Spinner />}
      {verified && (
        <h1 className='success'>
          Email Verified Successfully. <Link href='/login'>CLick here To Login</Link>
        </h1>
      )}
      {error && <h1 className='error'>Something Went Wrong</h1>}
    </div>
  );
}
