import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  title = "No books found", 
  description = "Try adjusting your search or filters", 
  showAddButton = true,
  icon = "📚"
}) => {
  return (
    <div className="text-center py-16">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 max-w-md mx-auto">
        <div className="bg-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl">{icon}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        
        {showAddButton && (
          <div className="space-y-3">
            <Link
              to="/add-book"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>➕</span>
              <span>Add First Book</span>
            </Link>
            <div className="text-sm text-gray-500">
              Be the first to add a book to our collection!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;