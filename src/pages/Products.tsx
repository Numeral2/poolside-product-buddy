import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard, { ProductVariant } from "@/components/ProductCard";
import ModernChatBot from "@/components/ModernChatBot";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, ChevronDown, ArrowUpDown, Grid3x3, List, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";

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
  const { addToCart } = useCart();
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(["categories", "price"]));

  const categories = [
    "Filteri", "Pumpe", 
    "Skimmeri", "Osnovna i ABS oprema", "PVC cijevi i fitinzi", "Rasvjeta",
    "Kemikalije", "Pribor za čišćenje", "Mozaik", "Materijal za oblaganje",
    "Doziranje i elektronika", "Efekti", "Inox ljestve", "Prekrivači",
    "Grijanje", "Roboti"
  ];

  const toggleFilterSection = (section: string) => {
    const newExpanded = new Set(expandedFilters);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedFilters(newExpanded);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

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

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
    
    setFilteredProducts(filtered);
  }, [category, products, fromChat, selectedCategory, priceRange, searchQuery, sortBy, sortOrder]);

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
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      {/* Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-24 w-64 h-[calc(100vh-6rem)] bg-card border-r border-border overflow-y-auto z-10">
        <div className="p-4 space-y-4">
          {/* Categories Section */}
          <div>
            <button
              onClick={() => toggleFilterSection("categories")}
              className="w-full flex items-center justify-between mb-2"
            >
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">KATEGORIJE</h2>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.has("categories") ? "rotate-180" : ""}`} />
            </button>
            
            {expandedFilters.has("categories") && (
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    selectedCategory === "all" 
                      ? "bg-muted text-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  Sve kategorije
                </button>
                
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      selectedCategory === cat 
                        ? "bg-muted text-foreground font-medium" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => toggleFilterSection("price")}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">CIJENA</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.has("price") ? "rotate-180" : ""}`} />
            </button>
            
            {expandedFilters.has("price") && (
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-9 text-sm bg-background"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-9 text-sm bg-background"
                />
                <Button onClick={handlePriceFilter} size="sm" className="w-full">
                  Primijeni
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pt-24 pb-12 px-4 lg:px-8">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Rezultati: "${searchQuery}"` : 
             selectedCategory !== "all" ? selectedCategory : "Svi Proizvodi"}
          </h1>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort By</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-9 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={toggleSortOrder}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Show</span>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(parseInt(v))}>
                <SelectTrigger className="w-20 h-9 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 border border-border rounded">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : viewMode === "list" ? (
          /* List View */
          <div className="space-y-4">
            {groupedProducts.slice(0, itemsPerPage).map((product) => {
              const originalPrice = product.price / 0.85;
              return (
                <div 
                  key={product.id}
                  className="bg-card rounded border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                    {/* Product Image */}
                    <div className="md:col-span-3">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square bg-muted/10 rounded overflow-hidden hover:bg-muted/20 transition-colors">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="md:col-span-9 flex flex-col justify-between">
                      <div>
                        <Link 
                          to={`/product/${product.id}`}
                          className="group"
                        >
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {product.description}
                        </p>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-medium mb-2">Dostupne veličine:</p>
                            <div className="flex flex-wrap gap-2">
                              {product.variants.map((variant) => {
                                const variantOriginalPrice = variant.price / 0.85;
                                return (
                                  <Link
                                    key={variant.id}
                                    to={`/product/${variant.id}`}
                                    className="group flex flex-col items-center px-4 py-2 border border-border rounded hover:border-primary hover:bg-primary/5 transition-all"
                                  >
                                    <span className="text-sm font-semibold group-hover:text-primary">
                                      {variant.size}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-muted-foreground line-through">
                                        €{variantOriginalPrice.toFixed(2)}
                                      </span>
                                      <span className="text-sm font-bold text-primary">
                                        €{variant.price.toFixed(2)}
                                      </span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
                        <div className="flex items-baseline gap-3">
                          <span className="text-xl text-muted-foreground line-through">
                            €{originalPrice.toFixed(2)}
                          </span>
                          <span className="text-3xl font-bold text-foreground">
                            €{product.price.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            category: product.category,
                            image: product.image,
                          })}
                          className="w-full sm:w-auto gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          ADD TO CART
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedProducts.slice(0, itemsPerPage).map((product) => (
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