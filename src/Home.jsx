import React from "react";
import Diamond from "../public/Images/Diamond.jpg";
import Animal from "../public/Images/animal.svg"
import IQ from "../public/Images/iq.svg"
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-green-300 px-4 py-8">
      <p className="text-4xl font-bold text-center mb-8 text-indigo-500">Welcome to Game World</p>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md border border-red-500 h-75 w-70">
          <img src={Diamond} alt="Diamond" className="w-50 h-40 mb-4 object-cover" />
          <h3 className="font-bold text-lg text-black">Diamond Finder</h3>
          <Link
            to="/game"
            className="mt-4 px-4 py-2 !bg-blue-600 !text-white rounded hover:bg-blue-700 inline-block text-center"
          >
            Play Now
          </Link>
        </div>

        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md border border-red-500 h-75 w-70">
          <img src={Animal  } alt="Diamond" className="w-50 h-40 mb-4 object-cover" />
          <p className="font-bold text-lg text-black">AnimalMatch</p>
          <Link 
          to="/animal"
          className="mt-4 px-4 py-2 !bg-blue-600 !text-white rounded hover:bg-blue-700 inline-block text-center"
          > 
            Play Now
          </Link>
        </div>

         <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md border border-red-500 h-75 w-70">
          <img src={IQ} alt="Diamond" className="w-50 h-40 mb-4 object-cover" />
          <p className="font-bold text-lg text-black">IQTest</p>
          <Link 
          to="/iq"
          className="mt-4 px-4 py-2 !bg-blue-600 !text-white rounded hover:bg-blue-700 inline-block text-center"
          > 
            Play Now
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
