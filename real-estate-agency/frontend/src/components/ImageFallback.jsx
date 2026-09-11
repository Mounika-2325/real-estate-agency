import React, { useState } from 'react';
import { Home } from 'lucide-react';

const ImageFallback = ({
  src,
  alt = 'Property Image',
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-shimmer flex items-center justify-center">
          <Home className="w-8 h-8 text-slate-400 animate-pulse" />
        </div>
      )}
      <img
        src={imgSrc || fallbackSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default ImageFallback;
