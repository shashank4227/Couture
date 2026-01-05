import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Manage Your Store <span className="text-indigo-600">Inventory</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Access real-time stock levels, browse catalogues, and analyze product performance from one dashboard.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link to="/inventory" className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutDashboard className="w-32 h-32 text-indigo-600" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Inventory Overview</h2>
            <p className="text-gray-500">
              High-density view of all products with search, filtering, and sorting capabilities.
            </p>
            <span className="inline-flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
              Go to Inventory <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </div>
        </Link>
        
        <Link to="/categories" className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
             <ShoppingBag className="w-32 h-32 text-purple-600" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Catalogue</h2>
            <p className="text-gray-500">
              Browse products by categories with a visual breakdown of your stock.
            </p>
            <span className="inline-flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
              Browse Categories <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
