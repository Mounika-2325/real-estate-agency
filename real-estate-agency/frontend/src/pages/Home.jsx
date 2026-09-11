import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle,
  KeyRound,
  FileCheck,
  TrendingUp,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import PropertySearch from '../components/PropertySearch';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { fetchProperties } from '../services/api';

const CITIES_SHOWCASE = [
  { name: 'Hyderabad', count: '450+ Properties', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bangalore', count: '620+ Properties', img: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mumbai', count: '850+ Properties', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chennai', count: '310+ Properties', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pune', count: '290+ Properties', img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=800&q=80' },
];

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFeaturedProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchProperties();
      // Pick first 6 properties
      if (response && response.data) {
        setFeaturedProperties(response.data.slice(0, 6));
      }
    } catch (err) {
      console.error(err);
      setError('Could not load featured properties. Please check backend API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const handleHeroSearch = (filters) => {
    const queryParams = new URLSearchParams();
    if (filters.city && filters.city !== 'All Cities') queryParams.append('city', filters.city);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.propertyType && filters.propertyType !== 'All Types') queryParams.append('propertyType', filters.propertyType);
    if (filters.listingType && filters.listingType !== 'All') queryParams.append('listingType', filters.listingType);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);

    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-slate-900 overflow-hidden pt-12 pb-20">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Real Estate Luxury Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>India's Premier Real Estate Agency Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Find Your Dream Home in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Prime Metro Cities</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse verified luxury apartments, villas, independent houses, and commercial land plots across Hyderabad, Bangalore, Mumbai, Chennai & Pune.
          </p>

          {/* Search Bar Overlay */}
          <div className="max-w-5xl mx-auto pt-4 text-left">
            <PropertySearch onSearch={handleHeroSearch} />
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="-mt-10 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-primary-600">1,250+</div>
            <div className="text-sm font-semibold text-slate-500">Verified Properties</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500">98.5%</div>
            <div className="text-sm font-semibold text-slate-500">Client Satisfaction</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-primary-600">5</div>
            <div className="text-sm font-semibold text-slate-500">Major Indian Cities</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500">30+</div>
            <div className="text-sm font-semibold text-slate-500">Expert Agents</div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Exclusive Listings</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold text-sm group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
            <p className="text-rose-700 font-medium">{error}</p>
            <button
              onClick={loadFeaturedProperties}
              className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl text-sm hover:bg-rose-700 inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Cities Showcase */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Explore Locations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Popular Metro Cities</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Find prime real estate investments in India's fastest-growing urban hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CITIES_SHOWCASE.map((city) => (
              <button
                key={city.name}
                onClick={() => navigate(`/properties?city=${city.name}`)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-left cursor-pointer focus:outline-none"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{city.count}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {city.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Our Value Proposition</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Clients Choose EstatePro</h2>
          <p className="text-slate-500 text-sm sm:text-base">
            We simplify real estate transactions with transparency, verified listings, and end-to-end guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Verified Listings</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every property title and document is physically verified by our legal advisory team before listing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Transparent Pricing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              No hidden fees, surprise charges, or inflated broker margins. Pure straightforward pricing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dedicated Agents</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Assigned personal real estate advisor to accompany you for property visits and negotiations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Legal & Loan Assistance</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Complete assistance with home loan approvals, stamp duty documentation, and property registration.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Our Expertise</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Comprehensive Real Estate Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 space-y-4">
              <KeyRound className="w-10 h-10 text-primary-600" />
              <h3 className="text-xl font-bold text-slate-900">Property Buying & Sales</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Find your perfect home or sell your existing property at competitive market valuation with ease.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 space-y-4">
              <Building2 className="w-10 h-10 text-amber-500" />
              <h3 className="text-xl font-bold text-slate-900">Rental & Leasing Management</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                End-to-end tenant vetting, lease agreement drafting, and rental collection for property owners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 space-y-4">
              <TrendingUp className="w-10 h-10 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">Real Estate Investment Advisory</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Strategic capital allocation in high-growth corridors to maximize long-term ROI and rental yields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-10 sm:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Speak directly with our expert real estate advisors or explore our extensive property portfolio today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-base transition shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-base border border-slate-700 transition cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
