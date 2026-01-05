import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api';
import { Loader } from '../components/common/Loader';
import { Tags } from 'lucide-react';

const CategoryOverview = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Catalogue</h1>
        <p className="text-sm text-gray-500 mt-1">Browse products by category.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          // DummyJSON categories are sometimes objects {slug, name, url} or strings
          const name = cat.name || cat; 
          const slug = cat.slug || cat;

          return (
            <Link 
              to={`/inventory?category=${slug}`} 
              key={index}
              className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-indigo-300 transition-all duration-200"
            >
              <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                 <Tags className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 capitalize group-hover:text-indigo-600">
                {name}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryOverview;
