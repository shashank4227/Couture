import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/UI';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/inventory/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        {/* Image Area */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discountPercentage > 5 && (
            <div className="absolute top-2 left-2">
              <Badge color="red">-{Math.round(product.discountPercentage)}%</Badge>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-indigo-600">
              {product.title}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
          
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              {product.stock <= 5 && (
                 <span className="text-xs text-red-600 font-medium">Low Stock: {product.stock}</span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
              {product.rating}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
