import React, { useState } from 'react';
import { Search, MapPin, Home, IndianRupee, Bed, RefreshCw } from 'lucide-react';

const CITIES = ['All Cities', 'Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Pune'];
const PROPERTY_TYPES = ['All Types', 'Apartment', 'Villa', 'House', 'Plot'];
const LISTING_TYPES = ['All', 'Sale', 'Rent'];

const PropertySearch = ({ initialFilters = {}, onSearch, onReset, isCompact = false }) => {
  const [filters, setFilters] = useState({
    city: initialFilters.city || 'All Cities',
    search: initialFilters.search || '',
    propertyType: initialFilters.propertyType || 'All Types',
    listingType: initialFilters.listingType || 'All',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    bedrooms: initialFilters.bedrooms || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleReset = () => {
    const resetValues = {
      city: 'All Cities',
      search: '',
      propertyType: 'All Types',
      listingType: 'All',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    };
    setFilters(resetValues);
    if (onReset) {
      onReset(resetValues);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6 transition-all ${
        isCompact ? 'space-y-4' : 'space-y-4 md:space-y-6'
      }`}
    >
      {/* Listing Type Toggle Pill */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        {LISTING_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, listingType: type }))}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              filters.listingType === type
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {type === 'All' ? 'All Listings' : type === 'Sale' ? 'Buy Property' : 'Rent Property'}
          </button>
        ))}
      </div>

      {/* Main Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Keyword / Locality Search */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="e.g. Jubilee Hills, Villa..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
            />
          </div>
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Select City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              name="city"
              value={filters.city}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition appearance-none cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Property Type
          </label>
          <div className="relative">
            <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition appearance-none cursor-pointer"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Min Bedrooms
          </label>
          <div className="relative">
            <Bed className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition appearance-none cursor-pointer"
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1+ BHK</option>
              <option value="2">2+ BHK</option>
              <option value="3">3+ BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Secondary Price Filter & Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-2 border-t border-slate-100">
        {/* Min Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="e.g. 5000000"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="e.g. 50000000"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-primary-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
            title="Clear Filters"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertySearch;
