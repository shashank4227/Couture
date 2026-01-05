import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { Loader, ProductCardSkeleton } from '../components/common/Loader';
import { Badge } from '../components/common/UI';
import ProductCard from '../components/inventory/ProductCard';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        window.scrollTo(0, 0);
        // 1. Fetch main product
        const pData = await fetchProductById(id);
        setProduct(pData);

        // 2. Fetch similar products by category
        if (pData.category) {
          const simData = await fetchProductsByCategory(pData.category, { limit: 6 });
          // Filter out current product
          setSimilarProducts(simData.products.filter(p => p.id !== pData.id).slice(0, 4));
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error || !product) return (
      <div className="text-center py-12">
          <p className="text-red-500">{error || 'Product not found'}</p>
          <Link to="/inventory" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Inventory</Link>
      </div>
  );

  return (
    <div className="space-y-12">
      {/* Back Link */}
      <Link to="/inventory" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Inventory
      </Link>

      {/* Product Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-4">
             <img 
               src={product.images ? product.images[0] : product.thumbnail} 
               alt={product.title} 
               className="max-h-[400px] object-contain"
             />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                 <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">{product.category}</span>
                 {product.stock <= 5 && <Badge color="red">Low Stock: {product.stock}</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-lg text-gray-500 mt-1">{product.brand}</p>
            </div>

            <div className="flex items-end space-x-4">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.discountPercentage > 0 && (
                <div className="mb-1">
                   <span className="text-sm text-gray-400 line-through mr-2">
                     ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                   </span>
                   <Badge color="red">Save {Math.round(product.discountPercentage)}%</Badge>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1">
               <Star className="w-5 h-5 text-yellow-400 fill-current" />
               <span className="font-bold text-gray-900">{product.rating}</span>
               <span className="text-gray-400">/ 5.0 Rating</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features/Meta */}
            <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-5 h-5 mr-3 text-indigo-500" />
                <span>Standard Shipping</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 mr-3 text-indigo-500" />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                 </div>
                 <p className="text-gray-600 mb-4 flex-1">"{review.comment}"</p>
                 <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs mr-3">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {review.reviewerName}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet for this product.</p>
        )}
      </div>

      {/* Similar Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Browse Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map((p) => (
             <div key={p.id} className="h-80">
                <ProductCard product={p} />
             </div>
          ))}
          {similarProducts.length === 0 && (
            <p className="text-gray-500">No similar products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
