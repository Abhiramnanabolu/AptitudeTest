import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await fetch('https://aptitude-be.abhiramreddy.shop/details', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setError('Failed to fetch user details');
          }
        } catch (err) {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('No token found. Please log in.');
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen flex flex-col font-['Poppins'] bg-gray-100">
      <header className="bg-zinc-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard">
            <div className='flex items-center'>
                <img
                  alt="Your Company"
                  src="https://res.cloudinary.com/dveqtvefo/image/upload/v1722965132/1_px5mrp.png"
                  className="mx-auto h-10 w-auto"
                />
                <h1 className='text-xl ml-3 font-semibold'>AptitudeHub</h1>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-lg">{user.username}</span>
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-xl">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow bg-black px-4 py-8 md:px-12 lg:px-24">
        {user ? (
          <>
            <div className="text-white mb-12">
              <p className="text-xl mb-2 mt-4 gradient-text">Welcome back, {user.name}! Ready to test your skills today ?</p>
            </div>
            <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-neutral-800 shadow-md rounded-lg p-6 text-white flex flex-col items-c enter transition-transform transform hover:translate-y-[-5px] hover:bg-neutral-700">
                <div className="text-indigo-600 text-4xl mb-4">
                  <i className="fas fa-play-circle"></i>
                </div>
                <h2 className="text-xl font-semibold mb-2">Start New Test</h2>
                <p className="text-zinc-400 mb-4 mt-2 text-ce nter">Begin a new aptitude test to challenge yourself and improve your skills.</p>
                <a href="/dashboard/categories" className="text-white text-center mt-2 bg-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-700">Start Test</a>
              </div>

              <div className="bg-neutral-800 shadow-md rounded-lg p-6 text-white flex flex-col ite ms-center transition-transform transform hover:translate-y-[-5px] hover:bg-neutral-700">
                <div className="text-indigo-600 text-4xl mb-4">
                  <i className="fas fa-history"></i>
                </div>
                <h2 className="text-xl font-semibold mb-2">View Test History</h2>
                <p className="text-zinc-400 mb-4 mt-2 te xt-center">Review your past test results and track your progress over time.</p>
                <a href="/dashboard/progress" className="text-indigo-600 font-semibold hover:text-indigo-500">View History</a>
              </div>

              <div className="bg-neutral-800 shadow-md rounded-lg p-6 text-white flex flex-col it ems-center transition-transform transform hover:translate-y-[-5px] hover:bg-neutral-700">
                <div className="text-indigo-600 text-4xl mb-4">
                  <i className="fas fa-user-edit"></i>
                </div>
                <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
                <p className="text-zinc-400 mb-4 mt-2 tex t-center">Update your profile information and manage your account settings.</p>
                <a href="/profile" className="text-indigo-600 font-semibold hover:text-indigo-500">Edit Profile</a>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">{error}</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
