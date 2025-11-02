import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard, { ProductVariant } from "@/components/ProductCard";
import ModernChatBot from "@/components/ModernChatBot";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const fromChat = searchParams.get("fromChat");
  const searchQuery = searchParams.get("search");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("10000");

  const categories = [
    "Bazeni", "SPA kade", "Saune", "Laghetto", "Filteri", "Pumpe", 
    "Skimmeri", "Osnovna i ABS oprema", "PVC cijevi i fitinzi", "Rasvjeta",
    "Kemikalije", "Pribor za čišćenje", "Mozaik", "Materijal za oblaganje",
    "Doziranje i elektronika", "Efekti", "Inox ljestve", "Prekrivači",
    "Grijanje", "Roboti"
  ];

  useEffect(() => {
    // Check if we have products from chatbot
    if (fromChat === "true") {
      const chatProducts = sessionStorage.getItem('chatbotProducts');
      if (chatProducts) {
        try {
          const parsedProducts = JSON.parse(chatProducts);
          setProducts(parsedProducts);
          setFilteredProducts(parsedProducts);
          setIsLoading(false);
          sessionStorage.removeItem('chatbotProducts'); // Clean up
          return;
        } catch (e) {
          console.error("Error parsing chatbot products:", e);
        }
      }
    }
    loadProducts();
  }, [fromChat]);

  // Update selectedCategory when URL category changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  useEffect(() => {
    if (fromChat === "true") return;
    
    let filtered = [...products];
    
    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [category, products, fromChat, selectedCategory, priceRange, searchQuery]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  const handlePriceFilter = () => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || 10000;
    setPriceRange([min, max]);
  };

  const loadProducts = async () => {
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
      let baseName = product.name;
      
      // Handle products ending with numbers (e.g., "Filter IML Lisboa 450", "Filter Astral Aster 500")
      if (/\s+\d+$/.test(product.name)) {
        baseName = product.name.replace(/\s+\d+$/, "");
      }
      // Handle products with size in middle (e.g., "6-putni multiventil 1 ½\" Astral")
      else if (product.name.includes('multiventil') && (product.name.includes('1 ½"') || product.name.includes('2"'))) {
        baseName = product.name.replace(/\s*1 ½"\s*|\s*2"\s*/, ' ').trim();
      }
      // Handle products with mm sizes (e.g., "Kvarcni pijesak 0.4-0.8mm", "Filter staklo 0.5-1.0mm")
      else if (/\s+[\d.-]+mm$/.test(product.name)) {
        baseName = product.name.replace(/\s+[\d.-]+mm$/, "");
      }
      
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(product);
    });

    return Object.entries(groups).map(([baseName, groupedProducts]) => {
      if (groupedProducts.length > 1) {
        // Multiple variants exist
        const variants: ProductVariant[] = groupedProducts.map(p => {
          // Extract size for standard products (number at end)
          const standardSizeMatch = p.name.match(/\d+$/);
          if (standardSizeMatch) {
            return {
              id: p.id,
              size: standardSizeMatch[0],
              price: p.price,
            };
          }
          
          // Extract size for multiventil products
          if (p.name.includes('1 ½"')) {
            return {
              id: p.id,
              size: '1 ½"',
              price: p.price,
            };
          } else if (p.name.includes('2"')) {
            return {
              id: p.id,
              size: '2"',
              price: p.price,
            };
          }
          
          // Extract size for mm-based products (e.g., "0.4-0.8mm", "1-2mm")
          const mmSizeMatch = p.name.match(/([\d.-]+mm)$/);
          if (mmSizeMatch) {
            return {
              id: p.id,
              size: mmSizeMatch[1],
              price: p.price,
            };
          }
          
          return {
            id: p.id,
            size: p.name,
            price: p.price,
          };
        }).sort((a, b) => {
          // Parse sizes for sorting
          const sizeA = parseFloat(a.size.replace(/[^\d.]/g, '')) || 0;
          const sizeB = parseFloat(b.size.replace(/[^\d.]/g, '')) || 0;
          return sizeA - sizeB;
        });

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

  const handleAskAI = (productName: string, selectedSize?: string) => {
    if (window.triggerChatbot) {
      const sizeInfo = selectedSize ? ` veličina ${selectedSize}` : '';
      window.triggerChatbot(`Reci mi detaljnije o proizvodu: ${productName}${sizeInfo}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="ml-64 container mx-auto px-4 pt-40 pb-12">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {searchQuery ? `Rezultati pretrage: "${searchQuery}"` : 
             category ? category : "Svi Proizvodi"}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Istražite našu premium ponudu bazenske opreme i dodataka
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Kliknite "Pitaj AI" na proizvodu za detaljne informacije
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 md:mb-6 p-4 glass-effect border border-primary/20 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Kategorija</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sve kategorije" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sve kategorije</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold mb-2 block">Raspon cijena (€)</label>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-9"
                  />
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-9"
                  />
                </div>
                <Button onClick={handlePriceFilter} size="sm" className="h-9">
                  Filtriraj
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : selectedCategory === "Filteri" ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Filteri za bazene - čista voda, bezbrižno kupanje</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Filteri su ključni dio sustava za održavanje čistoće vode u bazenu. Uklanjaju nečistoće, 
                  bakterije i alge, osiguravajući kristalno čistu vodu.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Naša ponuda uključuje profesionalne filtere vrhunske kvalitete - IML Lisboa seriju, 
                  Astral Aster filtere, multiventile i kompletnu opremu za filtraciju od kvarcnog pijeska 
                  do filter stakla. Prikladni za privatne i komercijalne bazene svih veličina.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/filter-lisboa.png" alt="IML Lisboa Filter" className="rounded-lg shadow-lg" />
                <img src="/images/filter-astral-aster.png" alt="Astral Aster Filter" className="rounded-lg shadow-lg" />
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-6">
              {groupedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                    {/* Product Image */}
                    <div className="md:col-span-3">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square bg-muted/10 rounded-lg overflow-hidden hover:bg-muted/20 transition-colors">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-6"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="md:col-span-9 flex flex-col justify-between">
                      <div className="space-y-3">
                        <Link 
                          to={`/product/${product.id}`}
                          className="group"
                        >
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>

                        {/* Variants Selection */}
                        {product.variants && product.variants.length > 0 && (
                          <div className="pt-3">
                            <p className="text-sm font-medium mb-3">Dostupne veličine:</p>
                            <div className="flex flex-wrap gap-3">
                              {product.variants.map((variant) => (
                                <Link
                                  key={variant.id}
                                  to={`/product/${variant.id}`}
                                  className="group flex flex-col items-center px-5 py-3 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                                >
                                  <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                                    {variant.size}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    €{variant.price.toFixed(2)}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Cijena od</p>
                          <p className="text-3xl font-bold text-primary">€{product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                          <Link to={`/product/${product.id}`} className="flex-1 sm:flex-none">
                            <Button className="w-full" size="lg">
                              Pogledaj Detalje
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleAskAI(product.name)}
                            className="gap-2"
                          >
                            <Sparkles className="h-4 w-4" />
                            Pitaj AI
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                onAskAI={handleAskAI}
                productId={product.id}
              />
            ))}
          </div>
        )}

        {!isLoading && groupedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Nema pronađenih proizvoda.</p>
          </div>
        )}
      </div>

      <ModernChatBot onOpenCatalog={() => {}} />
    </div>
  );
};

export default Products;