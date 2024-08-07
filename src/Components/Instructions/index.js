import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Information = () => {
  const { category } = useParams();
  const history = useHistory();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartTest = async () => {
    setLoading(true);
    setError(null);
    const token = Cookies.get('token');
    try {
      const response = await fetch(`http://localhost:3111/api/start-test/${category}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch test details');
      }
  
      const data = await response.json();
      setTestDetails(data);
  
      // Redirect to the test page with the received test ID and questions
      history.push({
        pathname: `/test/${category}/${data.testId}`,
        state: { questions: data.questions } // Passing questions through state
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col font-['Poppins'] bg-gray-100">
      <header className="bg-zinc-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard">
            <div className='flex justify-center items-center'>
                <img
                  alt="Your Company"
                  src="https://res.cloudinary.com/dveqtvefo/image/upload/v1722965132/1_px5mrp.png"
                  className=" h-10 mr-2 w-auto"
                />
                <h1 className='text-xl font-semibold'>AptitudeHub</h1>
            </div>
            </Link>
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-lg">Back to Dashboard</a>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-black px-4 py-8 md:px-12 lg:px-24">
        <div className="text-white">
          <p className="text-xl mt-4 gradient-text">Aptitude Test - {category}</p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg text-white mt-8">
          <h2 className="text-xl mb-4">Instructions</h2>
          <p className="mb-4">1 . <span className='font-semibold'> Number of Questions : </span> 10</p>
          <p className="mb-4">2 . <span className='font-semibold'> Type of Questions : </span> MCQs</p>
          <p className="mb-4">3 . <span className='font-semibold'> Score Scheme : </span>  All questions have equal weightage. Every correct response gets +1 mark. There is no negative marking.</p>
          <p className="mb-4">4 . You must answer all the MCQs correctly in order to mark your test as completed.</p>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <>
              {error && <p className="text-red-500">{error}</p>}
              <button
                onClick={handleStartTest}
                className="bg-indigo-600 mt-8 px-4 py-2 rounded-md text-white font-semibold hover:bg-indigo-700"
              >
                Start Test
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Information;
