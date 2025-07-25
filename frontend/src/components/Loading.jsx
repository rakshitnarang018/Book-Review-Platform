import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        {/* Inner spinning ring with gradient */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 absolute top-0 left-0"></div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">📚</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600 font-medium">{message}</p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;