import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Placeholder components
const Home = () => (
    <div className="text-center p-10 bg-green-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-700">🏠 Welcome Home!</h2>
    </div>
);
const About = () => (
    <div className="text-center p-10 bg-blue-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-700">ℹ About Our Application</h2>
    </div>
);
const Contact = () => (
    <div className="text-center p-10 bg-purple-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-purple-700">📧 Get in Touch</h2>
    </div>
);
const NotFound = () => (
    <div className="text-center p-10 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-red-700">⚠ 404 - Page Not Found</h2>
    </div>
);


const App = () => {
  return (
    // 1. BrowserRouter: Wraps the entire app to enable history/routing
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        {/* Navigation Bar with Link components */}
        <nav className="bg-gray-800 p-4 shadow-xl">
          <ul className="flex justify-center space-x-8">
            <li>
              {/* 2. Link: Used for client-side navigation */}
              <Link to="/" className="text-white hover:text-green-400 transition duration-150 font-semibold text-lg">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-400 transition duration-150 font-semibold text-lg">About</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-purple-400 transition duration-150 font-semibold text-lg">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* 3. Routes: Defines the container for route matching */}
        <div className="container mx-auto p-10">
          <Routes>
            {/* 4. Route: Defines the path and the component (element) to render */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Catch-all route for any undefined path (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;