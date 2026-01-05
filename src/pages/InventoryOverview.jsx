import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../services/api';
import InventoryTable from '../components/inventory/InventoryTable';
import { Input, Badge } from '../components/common/UI';
import { Loader } from '../components/common/Loader';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';

const InventoryOverview = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL Params for persistency
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sortBy') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort); // 'price-asc', 'price-desc', 'title-asc'
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Load Categories once
  useEffect(() => {
    fetchCategories().then(data => setCategories(data)).catch(console.error);
  }, []);

  // Fetch Data Effect
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let data;
        
        // Prepare params
        const params = {
          limit: LIMIT,
          skip: skip,
        };

        // Handle Sort
        if (sortBy) {
          const [key, order] = sortBy.split('-');
          params.sortBy = key;
          params.order = order;
        }

        if (debouncedSearch) {
          // Search API
          data = await fetchProducts({ ...params, q: debouncedSearch });
        } else if (selectedCategory) {
          // Category API
          data = await fetchProductsByCategory(selectedCategory, params);
        } else {
          // All Products API
          data = await fetchProducts(params);
        }

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError('Failed to load inventory. Please checking your connection.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [debouncedSearch, selectedCategory, sortBy, skip]);

  // Sync state to URL
  useEffect(() => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (sortBy) params.sortBy = sortBy;
    setSearchParams(params);
  }, [selectedCategory, sortBy, setSearchParams]);

  // Reset pagination when filter changes
  useEffect(() => {
    setSkip(0);
  }, [debouncedSearch, selectedCategory, sortBy]);

  const handlePageChange = (newSkip) => {
    if (newSkip >= 0 && newSkip < total) {
      setSkip(newSkip);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your store's products.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            icon={Search} 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select 
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm w-full sm:w-48 capitalize"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug || cat} value={cat.slug || cat}>
                {cat.name || cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select 
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm w-full sm:w-48"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <InventoryTable products={products} isLoading={isLoading} />
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg shadow-sm">
             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{skip + 1}</span> to <span className="font-medium">{Math.min(skip + LIMIT, total)}</span> of <span className="font-medium">{total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(skip - LIMIT)}
                      disabled={skip === 0}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(skip + LIMIT)}
                      disabled={skip + LIMIT >= total}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
             </div>
             {/* Mobile Pagination Simple */}
             <div className="flex justify-between w-full sm:hidden">
                <button
                   onClick={() => handlePageChange(skip - LIMIT)}
                   disabled={skip === 0}
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-700 pt-2">
                   {Math.min(skip + LIMIT, total)} / {total}
                </div>
                <button
                   onClick={() => handlePageChange(skip + LIMIT)}
                   disabled={skip + LIMIT >= total}
                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryOverview;
