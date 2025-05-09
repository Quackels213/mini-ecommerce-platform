import { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from '@/lib/api';

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      await createProduct({
        name,
        price: parseFloat(price),
        description,
        imageUrl: imageUrl || undefined
      });

      toast.success("Product added successfully!");

      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');

      // Notify parent component that a product was added
      onProductAdded();

    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10 rounded-2xl shadow-md border border-gray-200 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900">Add a New Product</CardTitle>
        <CardDescription className="text-base font-medium text-gray-600">
          Fill out the form below to add a new product to your store.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800 font-semibold">Product Name*</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="border-0 rounded-lg focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-800 font-semibold">Price ($)*</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="border-0 rounded-lg focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-800 font-semibold">Description*</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product"
              className="min-h-32 border-0 rounded-lg focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-gray-800 font-semibold">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-0 rounded-lg focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            {imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="h-40 object-contain border rounded"
                  onError={(e) => {
                    (e.target).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-200 rounded-lg h-11 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>

  );
};

export default ProductForm;
