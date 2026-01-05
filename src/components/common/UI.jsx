import React from 'react';
import clsx from 'clsx';
import { Search } from 'lucide-react';

export const Input = ({ className, icon: Icon, ...props }) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        className={clsx(
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2",
          Icon ? "pl-10" : "pl-3",
          className
        )}
        {...props}
      />
    </div>
  );
};

export const Badge = ({ children, color = 'gray' }) => {
  const colors = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      colors[color] || colors.gray
    )}>
      {children}
    </span>
  );
};
