import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ModernChatBot from "@/components/ModernChatBot";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShoppingCart, ArrowLeft, Truck, Shield, HeartHandshake, CreditCard, Headphones, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  features?: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchProduct();
      window.scrollTo(0, 0);
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Product not found');
      
      setProduct(data);

      // Fetch related products from same category
      const { data: related } = await supabase
        .from('products')
        .select('*')
        .eq('category', data.category)
        .neq('id', id)
        .limit(3);
      
      setRelatedProducts(related || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image_url,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-40 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-40 text-center">
          <h1 className="text-2xl font-bold mb-4">Proizvod nije pronađen</h1>
          <Button onClick={() => navigate('/products')}>Povratak na proizvode</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Početna</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Proizvodi</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Button 
          variant="ghost" 
          onClick={() => navigate(`/products?category=${product.category}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Natrag
        </Button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden border border-primary/20 bg-card">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="border-t border-primary/20 pt-6">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">€{product.price.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select value={quantity.toString()} onValueChange={(val) => setQuantity(parseInt(val))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 text-white font-semibold shadow-md hover:shadow-lg"
                    size="lg"
                    style={{ background: "var(--gradient-water)" }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Dodaj u Košaricu
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-green-600">● Na skladištu</span> - Brza dostava
                </p>
              </div>
            </div>
          </div>

          {/* Why Us Section - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-6">Zašto kupiti kod nas?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Brza dostava</h4>
                    <p className="text-sm text-muted-foreground">Slanje istog ili sljedećeg radnog dana</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Jamstvo kvalitete</h4>
                    <p className="text-sm text-muted-foreground">Proizvodi od provjerenih proizvođača</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">18+ godina iskustva</h4>
                    <p className="text-sm text-muted-foreground">Stručnost u bazenskoj opremi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Sigurna naplata</h4>
                    <p className="text-sm text-muted-foreground">Kartice, PayPal, virman</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Stručna podrška</h4>
                    <p className="text-sm text-muted-foreground">Besplatno savjetovanje i pomoć</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Povrat robe</h4>
                    <p className="text-sm text-muted-foreground">14 dana za povrat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="details">Detalji</TabsTrigger>
            <TabsTrigger value="info">Dodatne Informacije</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6 prose max-w-none">
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Karakteristike:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="info" className="mt-6">
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-primary/10">
                  <dt className="font-semibold">Kategorija:</dt>
                  <dd className="text-muted-foreground">{product.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/10">
                  <dt className="font-semibold">Dostupnost:</dt>
                  <dd className="text-green-600 font-semibold">Na skladištu</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/10">
                  <dt className="font-semibold">Dostava:</dt>
                  <dd className="text-muted-foreground">1-3 radna dana</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-semibold">Povrat:</dt>
                  <dd className="text-muted-foreground">14 dana</dd>
                </div>
              </dl>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Slični proizvodi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="cursor-pointer group"
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden bg-muted/50">
                      <img 
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium mb-1 line-clamp-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-primary">€{relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ModernChatBot onOpenCatalog={() => {}} />
    </div>
  );
};

export default ProductDetail;
