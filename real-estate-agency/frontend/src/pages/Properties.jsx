import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RefreshCw, AlertCircle, Building2 } from 'lucide-react';
import PropertySearch from '../components/PropertySearch';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { fetchProperties } from '../services/api';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  // Extract initial filters from URL search params
  const currentFilters = {
    city: searchParams.get('city') || 'All Cities',
    search: searchParams.get('search') || '',
    propertyType: searchParams.get('propertyType') || 'All Types',
    listingType: searchParams.get('listingType') || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
  };

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError('');

      const apiParams = {
        sort: sortOption,
      };

      if (currentFilters.city && currentFilters.city !== 'All Cities') {
        apiParams.city = currentFilters.city;
      }
      if (currentFilters.search) {
        apiParams.search = currentFilters.search;
      }
      if (currentFilters.propertyType && currentFilters.propertyType !== 'All Types') {
        apiParams.propertyType = currentFilters.propertyType;
      }
      if (currentFilters.listingType && currentFilters.listingType !== 'All') {
        apiParams.listingType = currentFilters.listingType;
      }
      if (currentFilters.minPrice) {
        apiParams.minPrice = currentFilters.minPrice;
      }
      if (currentFilters.maxPrice) {
        apiParams.maxPrice = currentFilters.maxPrice;
      }
      if (currentFilters.bedrooms) {
        apiParams.bedrooms = currentFilters.bedrooms;
      }

      const response = await fetchProperties(apiParams);
      if (response && response.data) {
        setProperties(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : 'Failed to fetch properties from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [searchParams, sortOption]);

  const handleSearchSubmit = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.city && newFilters.city !== 'All Cities') params.set('city', newFilters.city);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.propertyType && newFilters.propertyType !== 'All Types') params.set('propertyType', newFilters.propertyType);
    if (newFilters.listingType && newFilters.listingType !== 'All') params.set('listingType', newFilters.listingType);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.bedrooms) params.set('bedrooms', newFilters.bedrooms);

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header Banner */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Property Listings
          </h1>
          <p className="text-slate-500 text-base">
            Search verified luxury homes, apartments, villas, and commercial land plots across top Indian cities.
          </p>
        </div>

        {/* Filter Bar Component */}
        <PropertySearch
          initialFilters={currentFilters}
          onSearch={handleSearchSubmit}
          onReset={handleResetFilters}
        />

        {/* Results Bar (Count + Sort) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-slate-700 text-sm font-semibold flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary-600" />
            <span>
              {loading
                ? 'Searching properties...'
                : `Showing ${properties.length} ${properties.length === 1 ? 'property' : 'properties'}`}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-sm">
            <label className="text-slate-500 font-medium">Sort By:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-semibold focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-rose-900">Unable to load properties</h3>
            <p className="text-rose-700 text-sm max-w-md mx-auto">{error}</p>
            <button
              onClick={loadProperties}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Fetching</span>
            </button>
          </div>
        )}

        {/* Empty State Banner */}
        {!loading && !error && properties.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">No properties found matching your search.</h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your city selection, price limits, or property type filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
