import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ArrowLeft,
  Calendar,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import ImageFallback from '../components/ImageFallback';
import ContactModal from '../components/ContactModal';
import { fetchPropertyById } from '../services/api';
import { formatPrice, formatArea } from '../utils/formatters';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchPropertyById(id);
      if (res && res.data) {
        setProperty(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : 'Property details could not be found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/6" />
        <div className="h-96 bg-slate-200 rounded-3xl w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/2" />
            <div className="h-32 bg-slate-200 rounded-2xl w-full" />
          </div>
          <div className="h-64 bg-slate-200 rounded-3xl w-full" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Property Not Found</h2>
        <p className="text-slate-600 text-sm">{error || 'The requested property could not be loaded.'}</p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/properties"
            className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl text-sm hover:bg-slate-700 transition"
          >
            Back to Properties
          </Link>
          <button
            onClick={loadProperty}
            className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl text-sm hover:bg-primary-700 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    location,
    city,
    state,
    propertyType,
    listingType,
    bedrooms,
    bathrooms,
    area,
    images = [],
    amenities = [],
    features = [],
    agent,
    createdAt,
  } = property;

  const isRent = listingType === 'Rent' || listingType === 'For Rent';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-semibold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>

        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                  isRent ? 'bg-amber-500 text-white' : 'bg-primary-600 text-white'
                }`}
              >
                {isRent ? 'For Rent' : 'For Sale'}
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-slate-200 text-slate-700 rounded-full">
                {propertyType}
              </span>
              {createdAt && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Listed on {new Date(createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            <div className="flex items-center text-slate-600 text-sm gap-2">
              <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
              <span>{location}, {city}, {state}</span>
            </div>
          </div>

          {/* Price Banner */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start lg:items-end justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Listing Price</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-600">
              {formatPrice(price, listingType)}
            </span>
          </div>
        </div>

        {/* Image Gallery Showcase */}
        <div className="space-y-4">
          {/* Main Display Image */}
          <div className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <ImageFallback
              src={selectedImage || (images.length > 0 ? images[0] : '')}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails Row */}
          {images && images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl ? 'border-primary-600 ring-2 ring-primary-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageFallback src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Main Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Property Features Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Bed className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                <span className="block text-lg font-bold text-slate-900">{bedrooms || 0}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Bedrooms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Bath className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                <span className="block text-lg font-bold text-slate-900">{bathrooms || 0}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Bathrooms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Square className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                <span className="block text-lg font-bold text-slate-900">{formatArea(area)}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Area</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Building className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                <span className="block text-lg font-bold text-slate-900">{propertyType}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Type</span>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Property Description</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Amenities Section */}
            {amenities && amenities.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Building & Community Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Highlights / Features */}
            {features && features.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Special Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-slate-800 font-semibold text-sm">
                      <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Agent Card */}
          <div className="space-y-6 sticky top-28">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Assigned Listing Agent</span>

                {/* Agent Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-md">
                  <ImageFallback
                    src={agent?.photo}
                    alt={agent?.name || 'Agent'}
                    fallbackSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">{agent?.name || 'EstatePro Consultant'}</h4>
                  <p className="text-primary-600 text-xs font-semibold mt-0.5">{agent?.designation || 'Senior Advisor'}</p>
                </div>

                {agent?.bio && (
                  <p className="text-slate-500 text-xs leading-relaxed italic px-2">
                    "{agent.bio}"
                  </p>
                )}
              </div>

              {/* Contact Information & Action Buttons */}
              <div className="space-y-3">
                {agent?.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 text-sm font-semibold transition"
                  >
                    <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="truncate">{agent.phone}</span>
                  </a>
                )}

                {agent?.email && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 text-sm font-semibold transition"
                  >
                    <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="truncate">{agent.email}</span>
                  </a>
                )}

                {/* Contact Agent CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-primary-600/30 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Agent</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Official Agent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
        agent={agent}
      />
    </div>
  );
};

export default PropertyDetail;
