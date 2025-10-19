import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard, { ProductVariant } from "@/components/ProductCard";
import ModernChatBot from "@/components/ModernChatBot";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import projectBelEtage from "@/assets/project-bel-etage.png";
import projectBrela from "@/assets/project-brela.png";
import projectCamping from "@/assets/project-camping.png";
import projectDamianii from "@/assets/project-damianii.png";
import projectGava from "@/assets/project-gava.png";
import projectLokva from "@/assets/project-lokva.png";
import projectMarina from "@/assets/project-marina.png";
import projectDuce from "@/assets/project-duce.png";
import projectMakarska from "@/assets/project-makarska.png";

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
  const [selectedProject, setSelectedProject] = useState<{ title: string; location: string; image: string } | null>(null);

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
    fetchProducts();
  }, [fromChat]);

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

  const projectImages = [
    {
      id: 1,
      title: "Bel Etage Split",
      description: "Luksuzni infinity bazen s panoramskim pogledom",
      image: projectBelEtage,
      location: "Split",
    },
    {
      id: 2,
      title: "Vila Brela",
      description: "Elegantni privatni bazen s pogledom na more",
      image: projectBrela,
      location: "Brela",
    },
    {
      id: 3,
      title: "Camping Split",
      description: "Moderni javni bazeni za kampiste",
      image: projectCamping,
      location: "Camping Split",
    },
    {
      id: 4,
      title: "Hotel Damianii",
      description: "Luksuzni hotelski bazen uz obalu",
      image: projectDamianii,
      location: "Duće",
    },
    {
      id: 5,
      title: "Gava Resort",
      description: "Premium resort bazen s hidromasažom",
      image: projectGava,
      location: "Milna",
    },
    {
      id: 6,
      title: "Lokva Rogoznica",
      description: "Spektakularni infinity bazen uz kamp",
      image: projectLokva,
      location: "Lokva Rogoznica",
    },
    {
      id: 7,
      title: "Marina Residences",
      description: "Ekskluzivni privatni bazen s pogledom na marinu",
      image: projectMarina,
      location: "Marina",
    },
    {
      id: 8,
      title: "Duće Riviera",
      description: "Luksuzni krovni bazeni s pogledom na more",
      image: projectDuce,
      location: "Duće",
    },
    {
      id: 9,
      title: "Makarska Premium",
      description: "Moderna vila s rooftop infinity bazenom",
      image: projectMakarska,
      location: "Makarska",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {searchQuery ? `Rezultati pretrage: "${searchQuery}"` : 
             category ? category : "Svi Proizvodi"}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Istražite našu premium ponudu bazenske opreme i dodataka
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 glass-effect border border-primary/20 rounded-lg">
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
        ) : (
          <>
            {/* Project Images Section - Only show when Bazeni category is selected */}
            {selectedCategory === "Bazeni" && (
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  Naši Realizirani Projekti
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {projectImages.map((project) => (
                    <div 
                      key={project.id}
                      className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 bg-card">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        </div>
                        <p className="text-foreground/70">{project.description}</p>
                        <p className="text-sm text-primary mt-2 font-medium">{project.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          </>
        )}

        {!isLoading && groupedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Nema pronađenih proizvoda.</p>
          </div>
        )}
      </div>

      <ModernChatBot onOpenCatalog={() => {}} />

      {/* Project Location Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <MapPin className="h-6 w-6 text-primary" />
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-semibold">Lokacija:</span>
                <span className="text-primary">{selectedProject.location}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;