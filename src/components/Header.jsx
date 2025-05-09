import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <Link className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">ShopIt</h1>
        </Link>

        <div className="w-full sm:w-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-md w-full flex justify-center">
              <TabsTrigger
                value="submit"
                className="cursor-pointer text-base font-semibold flex-1 sm:flex-none px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow text-center"
              >
                Product Submission
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="cursor-pointer text-base font-semibold flex-1 sm:flex-none px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow text-center"
              >
                My Products
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
};

export default Header;