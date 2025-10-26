import React, { useState } from 'react';

// Simplified list of target languages
const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
];

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠ IMPORTANT: Replace these with your actual RapidAPI credentials!
  const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY'; 
  const RAPIDAPI_HOST = 'YOUR_RAPIDAPI_HOST'; 
  const API_ENDPOINT = 'YOUR_API_ENDPOINT'; 

  const translateText = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    // Request structure for a common RapidAPI translation endpoint
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
      body: q=${encodeURIComponent(inputText)}&target=${targetLang}&source=en,
    };

    try {
      const response = await fetch(API_ENDPOINT, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Translation API request failed.');
      }

      // ⚠ Adjust this line based on your chosen API's response structure
      const result = data.data.translations[0].translatedText; 
      setTranslatedText(result);
    } catch (err) {
      console.error(err);
      setError('Error: Could not translate text. Check API key/host or network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-2xl rounded-xl min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-800 border-b pb-3">
        🌐 RapidAPI Text Translator
      </h1>
      
      {/* Input Section */}
      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-semibold text-gray-700 mb-2">
          1. Enter English Text:
        </label>
        <textarea
          id="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="5"
          className="w-full p-4 border-2 border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
          placeholder="Type text to translate here..."
        ></textarea>
      </div>

      {/* Language Selection and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <label htmlFor="language" className="text-sm font-semibold text-gray-700">
            2. Translate to:
          </label>
          <select
            id="language"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={translateText}
          disabled={isLoading || !inputText.trim()}
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition duration-150"
        >
          {isLoading ? 'Translating...' : '3. Translate Text'}
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-8 pt-4 border-t-2 border-indigo-100">
        <h2 className="text-xl font-extrabold mb-3 text-indigo-800 flex items-center">
            <span className="mr-2">✨</span> Translation Result:
        </h2>
        {error && <p className="p-3 bg-red-100 text-red-700 font-medium rounded-lg border border-red-300">{error}</p>}
        <div className="p-4 bg-indigo-50 border border-indigo-300 rounded-lg min-h-[120px] shadow-inner flex items-center">
          <p className="text-gray-800 text-lg break-words">
            {translatedText || (isLoading ? '...Please wait for the magic to happen.' : 'The translated text will appear here.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Translator;