import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const NetworkAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-2 text-center text-sm font-medium animate-in slide-in-from-top duration-300 flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4" />
      No internet connection. Data may be outdated.
    </div>
  );
};

export default NetworkAlert;
