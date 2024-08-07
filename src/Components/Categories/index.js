import React from 'react';
import { Link } from 'react-router-dom';

// Define the categories
const categories = [
  { name: 'Ratios', icon: 'fas fa-calculator', description: 'Test your skills in ratios and proportions.', path: '/test/Ratios' },
  { name: 'Time and Work', icon: 'fas fa-clock', description: 'Challenge yourself with time and work problems.', path: '/test/Time-and-Work' },
  { name: 'All-in-One', icon: 'fas fa-clipboard-list', description: 'A comprehensive test covering all categories.', path: '/test/All-in-one' },
  { name: 'Profit and Loss', icon: 'fas fa-money-bill', description: 'Evaluate your understanding of profit and loss scenarios.', path: '/test/Profit-and-Loss' },
  { name: 'Problems on Ages', icon: 'fas fa-calendar-alt', description: 'Solve problems related to ages and their relationships.', path: '/test/Problems-on-Ages' },
  { name: 'Percentage', icon: 'fas fa-percent', description: 'Test your percentage calculation skills.', path: '/test/Percentage' },
  { name: 'LCM and HCF', icon: 'fas fa-divide', description: 'Assess your knowledge of LCM and HCF problems.', path: '/test/LCM-HCF' },
  { name: 'Boats and Streams', icon: 'fas fa-water', description: 'Challenge your understanding of boats and streams problems.', path: '/test/Boats-and-Streams' },
  // Add more categories as needed
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col font-['Poppins'] bg-gray-100">
      <header className="bg-zinc-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard">
            <div className='flex justify-center items-center'>
                <img
                  alt="Your Company"
                  src="https://res.cloudinary.com/dveqtvefo/image/upload/v1722965132/1_px5mrp.png"
                  className="h-10 mr-2 w-auto"
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
          <p className="text-xl mt-4 gradient-text">Choose a Test Category</p>
        </div>
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              to={category.path} 
              key={category.name}
              className="bg-neutral-800 shadow-md rounded-lg p-6 text-white flex flex-col items-center transition-transform transform hover:translate-y-[-5px] hover:bg-neutral-700"
            >
              <div className="text-indigo-600 text-4xl mb-4">
                <i className={category.icon}></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-zinc-400 mb-4 mt-2 text-center">{category.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
