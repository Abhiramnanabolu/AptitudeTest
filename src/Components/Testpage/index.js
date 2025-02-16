import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TestPage = () => {
  const { category, testId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState('00:00');

  useEffect(() => {
    const { questions: initialQuestions } = location.state || {};
    if (initialQuestions) {
      setQuestions(initialQuestions);
    } else {
      setQuestions([]);
    }

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setFinished(true);
          setTimeTaken(calculateTimeTaken());
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state, category, testId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateTimeTaken = () => {
    const endTime = Date.now();
    const timeTakenMs = Math.max(endTime - startTime, 0);
    return formatTime(Math.floor(timeTakenMs / 1000));
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption) {
      const options = JSON.parse(currentQuestion.options);

      if (selectedOption === currentQuestion.answer) {
        setScore(prevScore => prevScore + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
      } else {
        setFinished(true);
        setTimeTaken(calculateTimeTaken());
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://aptitude-be.abhiramreddy.in/tests/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId,
          score,
          timeTaken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test results');
      }

      const result = await response.json();
      console.log('Submission Result:', result);

      // Redirect to dashboard
      history.push('/dashboard');
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col font-['Poppins'] bg-gray-100">
        <header className="bg-zinc-900 text-white p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">AptitudeHUB</div>
        </header>
        <main className="flex-grow bg-black px-4 py-8 md:px-12 lg:px-24">
          <div className="text-white">
            <p className="text-xl mt-4 gradient-text">Test Completed</p>
          </div>
          <div className="bg-neutral-800 p-6 rounded-lg text-white mt-8 shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Final Score: {score} / {questions.length}</h2>
            <div className="text-xl mb-2">
              <span className="font-medium">Time Taken:</span> {timeTaken}
            </div>
            <div className="text-xl mb-2">
              <span className="font-medium">Category:</span> {category}
            </div>
            <button
              onClick={handleSubmit}
              className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-700 mt-6"
            >
              Done
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen flex flex-col font-['Poppins'] bg-gray-100">
      <header className="bg-zinc-900 text-white p-4 flex justify-between items-center">
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
        <div className="text-lg">
          <span>Time Remaining: {formatTime(timeRemaining)}</span>
        </div>
      </header>

      <main className="flex-grow bg-black px-4 py-8 md:px-12 lg:px-24">
        <div className="bg-neutral-800 p-6 rounded-lg text-white mt-8">
          <p className="text-lg mb-8">Question {currentQuestionIndex + 1} of {questions.length}</p>
          {currentQuestion ? (
            <>
              <h3 className="text-xl mb-6">{currentQuestion.text}</h3>
              <div className="mb-8">
                {JSON.parse(currentQuestion.options).map(option => (
                  <div key={option} className="mb-2">
                    <input
                      type="radio"
                      id={option}
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    <label htmlFor={option} className="ml-2">{option}</label>
                  </div>
                ))}
              </div>
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-indigo-700"
              >
                Next
              </button>
            </>
          ) : (
            <p className="text-white">Loading question...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestPage;
