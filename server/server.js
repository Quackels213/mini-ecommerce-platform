import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" || '*'  // You might replace this with an array for safety later
}));

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Contextual Search route
app.get('/api/products/search', async (req, res) => {
  const { query } = req.query;

  try {
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Step 1: Clean and tokenize query
    const stopWords = new Set([
      'i', 'me', 'my', 'need', 'want', 'some', 'for', 'the', 'a', 'an', 'and', 'to', 'of', 'on', 'in', 'at', 'with', 'you', 'your', 'it'
    ]);

    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    if (keywords.length === 0) {
      return res.status(400).json({ error: 'Search query is too vague or generic' });
    }

    // Step 2: Build Prisma OR conditions
    const orConditions = keywords.flatMap((keyword) => [
      { name: { contains: keyword, mode: 'insensitive' } },
      { description: { contains: keyword, mode: 'insensitive' } },
    ]);

    // Step 3: Fetch and filter products manually based on match count
    const allProducts = await prisma.product.findMany();

    const matchedProducts = allProducts
      .map(product => {
        const text = `${product.name} ${product.description}`.toLowerCase();
        const matchCount = keywords.reduce((count, keyword) => {
          return text.includes(keyword) ? count + 1 : count;
        }, 0);

        return { product, matchCount };
      })
      .filter(item => item.matchCount > 0) // Require at least 1 keyword match
      .sort((a, b) => b.matchCount - a.matchCount) // Sort by match score
      .map(item => item.product); // Extract just the products

    res.json(matchedProducts);
  } catch (error) {
    console.error('Error in contextual search:', error);
    res.status(500).json({ error: 'Failed to perform contextual search' });
  }
});


// Create a product
app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    if (!name || !price || !description) {
      return res.status(400).json({ error: 'Name, price, and description are required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl: imageUrl || null
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Static file serving in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');

  if (fs.existsSync(distPath)) {
    console.log('Serving frontend from:', distPath);
    app.use(express.static(distPath));

    // Catch-all fallback **without route parsing**
    app.use((req, res, next) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn('⚠️ Frontend dist folder not found. Skipping static file setup.');
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Disconnected from database');
  process.exit(0);
});
