import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  const { name, price, description, imageUrl } = product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="product-card overflow-hidden flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
          <span className="font-bold text-blue-600">{formatPrice(price)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="cursor-pointer w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
