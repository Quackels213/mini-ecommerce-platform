const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

// Get all products
export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Search products
export async function searchProducts(query) {
  try {
    const response = await fetch(`${API_URL}/products/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

// Create a product
export async function createProduct(product) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create product');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
