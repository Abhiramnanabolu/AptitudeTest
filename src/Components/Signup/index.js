import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import Cookies from 'js-cookie'; // Import js-cookie
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (name === '' || username === '' || password === '') {
      setError('All fields are required');
      return;
    }
    setError('');

    try {
      const response = await fetch('https://aptitude-be.abhiramreddy.in/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT in a cookie
        Cookies.set('token', data.token, { expires: 7, path: '/' });

        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          history.push('/dashboard'); // Use history.push for redirection
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-black font-['Montserrat'] flex items-center justify-center text-white">
      <div className="w-full max-w-md px-6 py-6 bg-zinc-900 border-1 border-slate-500 rounded-lg shadow-lg">
        <div className="text-center">
        <div className='flex justify-center items-center'>
                <img
                  alt="Your Company"
                  src="https://res.cloudinary.com/dveqtvefo/image/upload/v1722965132/1_px5mrp.png"
                  className=" h-10 mr-2 w-auto"
                />
                <h1 className='text-xl font-semibold'>AptitudeHub</h1>
            </div>
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-white">
            Create a new account
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-300">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-300">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}

            {success && (
              <p className="mt-4 text-center text-sm text-green-500">{success}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
