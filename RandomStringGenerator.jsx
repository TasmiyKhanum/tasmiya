import React, { useState, useEffect, useCallback } from 'react';

// Character sets for string generation
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

// Helper function to generate a random string
const generateRandomString = (length) => {
  let result = '';
  const charactersLength = CHARACTERS.length;
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const RandomStringGenerator = () => {
  // 1. useState: State for string, length, and a flag to force re-run
  const [randomString, setRandomString] = useState('');
  const [stringLength, setStringLength] = useState(15);
  const [forceRegen, setForceRegen] = useState(0); 

  // 2. useCallback: Memoizes the function. 
  // This ensures a stable reference for the useEffect dependency.
  const createNewString = useCallback(() => {
    console.log('Generating string...');
    const length = stringLength > 0 ? stringLength : 1; 
    setRandomString(generateRandomString(length));
  }, [stringLength]); // Dependency on stringLength

  // 3. useEffect: Triggers the string generation logic.
  // Runs on mount and whenever its dependencies change.
  useEffect(() => {
    createNewString();
    
    // Cleanup phase
    return () => {
      console.log('Cleanup: useEffect finished.');
    };
  }, [stringLength, createNewString, forceRegen]); 
  // Dependencies: stringLength (for length changes), createNewString (stable func ref), forceRegen (for manual clicks)

  // Handler to manually re-generate the string without changing length
  const handleRegenerateClick = () => {
    // Changing this state variable forces the useEffect to re-run
    setForceRegen(prev => prev + 1);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-50 shadow-2xl rounded-xl border border-gray-200">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">🔐 String Generator (Hooks Demo)</h1>

      {/* Length Input */}
      <div className="mb-6">
        <label htmlFor="length" className="block text-sm font-semibold text-gray-700 mb-2">
          Desired String Length: 
        </label>
        <input
          id="length"
          type="number"
          min="1"
          max="100"
          value={stringLength}
          onChange={(e) => setStringLength(parseInt(e.target.value) || 0)}
          className="w-full p-3 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-inner"
        />
      </div>

      {/* Generated String Display */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-blue-700">Random String:</h2>
        <div className="p-4 bg-blue-100 border border-blue-400 rounded-lg break-all font-mono text-gray-900 select-all cursor-text text-lg">
          {randomString}
        </div>
      </div>

      {/* Regeneration Button */}
      <button
        onClick={handleRegenerateClick}
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-xl hover:bg-blue-700 transition duration-150 transform hover:scale-[1.01]"
      >
        Re-Generate
      </button>
    </div>
  );
};

export default RandomStringGenerator;