'use client';

import Input from '@/components/Input';
import Link from 'next/link';
import React, { useEffect } from 'react';

function Register() {
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState({
    userName: '',
    password: '',
    email: '',
  });
  const onRegister = async () => {
    console.log(user);
  };

  useEffect(() => {
    if (user.userName.length > 0 && user.email.length > 0 && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex h-screen justify-center items-center'>
      <form className='auth-form flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
        <h1 className='text-2xl'>Register</h1>
        <hr />

        <Input
          label='Username'
          type='text'
          name='userName'
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          error={user.userName.length === 0 ? 'Username is required' : ''}
          placeholder='Enter your username'
          required
        />

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

        <button className={buttonDisabled ? 'disabled-btn' : ''} onClick={onRegister}>
          Register
        </button>

        <Link href='/login'>Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Register;
