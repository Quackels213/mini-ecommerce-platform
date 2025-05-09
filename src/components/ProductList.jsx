import { useState, useEffect } from 'react';
import { getProducts, searchProducts } from '@/lib/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { toast } from "sonner";

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh, toast]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      const data = await getProducts();
      setProducts(data);
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error("Failed to search products. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = async () => {
    setSearchQuery('');
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900">My Products</h2>
          <p className="text-base font-medium text-gray-600 mt-2">Browse or search through your product listings</p>
        </div>


        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-0 border-gray-300 rounded-lg focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSearching}
            className="cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>

          {searchQuery && (
            <Button
              type="button"
              onClick={clearSearch}
              variant="outline"
              className="cursor-pointer w-full sm:w-auto px-5 py-2.5 border-gray-300 text-gray-700"
            >
              Clear
            </Button>
          )}
        </form>

        {/* Product Grid or States */}
        {loading ? (
          <div className="text-center py-20 text-gray-600 text-lg font-semibold">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 font-medium">
              {searchQuery ?
                `No results match "${searchQuery}".` :
                "You haven't added any products yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
