import React from 'react';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy,
  genres = [],
  totalBooks = 0 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <span className="text-xl">🔍</span>
          <span>Find Your Perfect Book</span>
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Search through {totalBooks} amazing books
        </p>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Books
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">📚</span>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="title">Title A-Z</option>
              <option value="author">Author A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchTerm || selectedGenre) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('');
            }}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1"
          >
            <span>✖️</span>
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;