import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      // Fetch user details from the server
      fetch('http://localhost:3111/details', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col font-['Poppins']">
      <header className="bg-zinc-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className='flex justify-center items-center'>
            <img
              alt="Your Company"
              src="https://res.cloudinary.com/dveqtvefo/image/upload/v1722965132/1_px5mrp.png"
              className="h-10 mr-2 w-auto"
            />
            <h1 className='text-xl font-semibold'>AptitudeHub</h1>
          </div>
          <div>
            {user ? (
              <div className="flex items-center">
                <span className="mr-4">{user.username}</span>
                <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-indigo-600 px-3 py-2 rounded-md text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow bg-cover bg-center relative flex items-center justify-center overflow-hidden bg-black px-4 md:px-6 lg:px-12">
        <div className="relative text-black z-10 flex items-center justify-center flex-col text-center py-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full md:w-2/5 lg:w-2/5 mb-4 text-white">
            Unlock Your Potential with Our Aptitude Test
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-lg mb-6 w-full md:w-1/2 lg:w-1/2 text-zinc-400">
            Discover your strengths, identify areas for growth, and take the first step towards a fulfilling career. Our comprehensive aptitude test is designed to provide you with valuable insights and personalized recommendations.
          </p>
          <a href="/dashboard" className="text-white px-6 py-3 bg-indigo-600 rounded text-base md:text-lg lg:text-xl font-semibold hover:bg-indigo-700">
            Start Test
          </a>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
