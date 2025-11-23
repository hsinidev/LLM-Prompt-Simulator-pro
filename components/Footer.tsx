import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-gray-800 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 mb-2">
          Powered by Google Gemini API
        </p>
        <p className="text-gray-300 font-medium">
          Powered by <span className="text-indigo-400">HSINI MOHAMED</span>
        </p>
        <a 
          href="https://github.com/hsinidev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
        >
          https://github.com/hsinidev
        </a>
        <div className="mt-6 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Doodax.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
