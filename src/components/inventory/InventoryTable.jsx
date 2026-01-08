import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { Badge } from '../common/UI';

const StockStatus = ({ stock }) => {
  if (stock > 10) return <Badge color="green"><CheckCircle className="w-3 h-3 mr-1 inline" />In Stock</Badge>;
  if (stock > 0) return <Badge color="yellow"><AlertTriangle className="w-3 h-3 mr-1 inline" />Low Stock</Badge>;
  return <Badge color="red"><XCircle className="w-3 h-3 mr-1 inline" />Out of Stock</Badge>;
};

const InventoryTable = ({ products, isLoading }) => {
  const navigate = useNavigate();

  if (products.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr 
                key={product.id} 
                onClick={() => navigate(`/inventory/${product.id}`)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                role="button"
                tabIndex={0}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover bg-gray-100" src={product.thumbnail} alt="" loading="lazy" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-50" title={product.title}>{product.title}</div>
                      <div className="text-sm text-gray-500">#{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-800 capitalize">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.brand || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StockStatus stock={product.stock} />
                  <span className="ml-2 text-xs text-gray-400">({product.stock})</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ChevronRight className="w-5 h-5 text-gray-400 inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Feed View */}
      <div className="md:hidden divide-y divide-gray-200">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/inventory/${product.id}`)}
            className="p-4 flex items-center space-x-4 active:bg-gray-50 cursor-pointer"
          >
             <div className="shrink-0">
               <img className="h-16 w-16 rounded-md object-cover bg-gray-100" src={product.thumbnail} alt="" loading="lazy"/>
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
               <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
                  <span className="capitalize">{product.category}</span>
                  {product.brand && (
                    <>
                      <span>•</span>
                      <span className="font-medium text-gray-600">{product.brand}</span>
                    </>
                  )}
               </div>
               <div className="flex items-center mt-1 space-x-2">
                 <span className="text-sm font-bold text-gray-900">${product.price}</span>
                 <StockStatus stock={product.stock} />
               </div>
             </div>
             <div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;
