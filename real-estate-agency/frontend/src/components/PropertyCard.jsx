import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import ImageFallback from './ImageFallback';
import { formatPrice, formatArea } from '../utils/formatters';

const PropertyCard = ({ property }) => {
  if (!property) return null;

  const {
    _id,
    title,
    price,
    location,
    city,
    propertyType,
    listingType,
    bedrooms,
    bathrooms,
    area,
    images,
  } = property;

  const isRent = listingType === 'Rent' || listingType === 'For Rent';

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group">
      {/* Image Container with Badges */}
      <div className="relative h-56 w-full overflow-hidden">
        <ImageFallback
          src={images && images.length > 0 ? images[0] : ''}
          alt={title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Listing Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md ${
              isRent
                ? 'bg-amber-500 text-white'
                : 'bg-primary-600 text-white'
            }`}
          >
            {isRent ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold bg-slate-900/75 backdrop-blur-md text-white rounded-full">
            {propertyType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price & Location */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(price, listingType)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-slate-500 text-sm mt-1.5 gap-1.5">
            <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
            <span className="truncate">{location}, {city}</span>
          </div>
        </div>

        {/* Property Features Pill Strip */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-slate-600 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{bedrooms || 0} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{bathrooms || 0} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{formatArea(area)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/properties/${_id}`}
          className="mt-2 w-full py-2.5 px-4 bg-slate-50 hover:bg-primary-600 text-slate-700 hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn border border-slate-200 hover:border-primary-600"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
