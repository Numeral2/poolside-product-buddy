import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard, { ProductVariant } from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

interface GroupedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  variants?: ProductVariant[];
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category && products.length > 0) {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupProducts = (products: Product[]): GroupedProduct[] => {
    const groups: { [key: string]: Product[] } = {};
    
    products.forEach(product => {
      // Extract base name (e.g., "Filter IML Lisboa" from "Filter IML Lisboa 450")
      const baseName = product.name.replace(/\s+\d+$/, "");
      
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(product);
    });

    return Object.entries(groups).map(([baseName, groupedProducts]) => {
      if (groupedProducts.length > 1) {
        // Multiple variants exist
        const variants: ProductVariant[] = groupedProducts.map(p => {
          const sizeMatch = p.name.match(/\d+$/);
          const size = sizeMatch ? sizeMatch[0] : p.name;
          return {
            id: p.id,
            size: size,
            price: p.price,
          };
        }).sort((a, b) => parseFloat(a.size) - parseFloat(b.size));

        return {
          id: groupedProducts[0].id,
          name: baseName,
          description: groupedProducts[0].description,
          price: groupedProducts[0].price,
          category: groupedProducts[0].category,
          image: groupedProducts[0].image_url,
          variants,
        };
      } else {
        // Single product
        const p = groupedProducts[0];
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          image: p.image_url,
        };
      }
    });
  };

  const groupedProducts = useMemo(() => {
    return groupProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category ? category : "All Products"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our premium selection of pool equipment and accessories
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                category={product.category}
                image={product.image}
                variants={product.variants}
              />
            ))}
          </div>
        )}

        {!isLoading && groupedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>

      <ChatBot onProductsUpdate={(chatProducts) => {
        if (chatProducts.length > 0) {
          setFilteredProducts(chatProducts);
        }
      }} />
    </div>
  );
};

export default Products;