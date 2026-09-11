import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-8xl font-extrabold text-primary-600 tracking-tight">404</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-slate-600 text-sm">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-primary-600/30 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/properties"
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-sm transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
