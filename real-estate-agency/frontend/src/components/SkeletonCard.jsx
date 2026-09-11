import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-52 bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-6 bg-slate-200 rounded w-1/3" />
        </div>
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        
        <div className="pt-3 border-t border-slate-100 flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
        </div>

        <div className="h-10 bg-slate-200 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
