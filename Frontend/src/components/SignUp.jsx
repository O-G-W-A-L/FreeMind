import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-n-7 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-n-0" style={{ fontFamily: 'var(--font-sora)' }}>
          Sign Up
        </h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-n-1">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-n-6 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-n-8 text-n-1"
              style={{ fontFamily: 'var(--font-code)' }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-n-1">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-n-6 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-n-8 text-n-1"
              style={{ fontFamily: 'var(--font-code)' }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Sign Up
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center" style={{ fontFamily: 'var(--font-grotesk)' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
