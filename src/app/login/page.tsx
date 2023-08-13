'use client';
import Input from '@/components/Input';
import React, { useEffect } from 'react';
import Link from 'next/link';

function Login() {
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState({
    password: '',
    email: '',
  });

  const onLogin = async () => {};

  useEffect(() => {
    if (user.email.length > 0 && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex h-screen justify-center items-center'>
      <form className='auth-form flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
        <h1 className='text-2xl'>Login</h1>
        <hr />

        <Input
          label='Email'
          type='email'
          name='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          error={user.email.length === 0 ? 'Email is required' : ''}
          placeholder='Enter your email'
          required
        />

        <Input
          label='Password'
          type='password'
          name='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          error={user.password.length === 0 ? 'Password is required' : ''}
          placeholder='Enter your password'
          required
        />

        <button className={buttonDisabled ? 'disabled-btn' : ''} onClick={onLogin}>
          Login
        </button>

        <Link href='/register'>Don't have an account? Register</Link>
      </form>
    </div>
  );
}

export default Login;
