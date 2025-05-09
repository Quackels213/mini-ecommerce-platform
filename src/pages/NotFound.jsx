import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="animate-bounce">
        {/* Subtle animation to make the 404 image bounce a little */}
        <img
          src="/404-illustration.svg"
          alt="404 Illustration"
          className="w-64 max-w-full opacity-90 transform hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      <p className="text-3xl font-extrabold mt-6 tracking-tight">
        <span className="text-shadow text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          Yeh route toh kahin nahi jaata!
        </span>
        <span className="text-gray-500"> 😅</span>
      </p>

      <p className="text-lg mt-4 font-medium opacity-80 mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Button
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-xl font-semibold shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        🔙 Take Me Home
      </Button>
    </div>
  );
};

export default NotFound;
