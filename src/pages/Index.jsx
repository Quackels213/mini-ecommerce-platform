import { useState } from 'react';
import Header from '@/components/Header';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    // Increment refresh trigger to cause ProductList to reload data
    setRefreshTrigger(prev => prev + 1);
    // Switch to products tab
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'submit' ? (
            <ProductForm onProductAdded={handleProductAdded} />
          ) : (
            <ProductList refresh={refreshTrigger} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-lg p-2 mr-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              ShopIt
            </h2>
          </div>
          <p className="text-center text-sm font-medium text-gray-600">
            &copy; {new Date().getFullYear()} ShopIt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
