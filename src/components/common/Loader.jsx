import React from 'react';

export const Loader = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div className="aspect-square bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
);
