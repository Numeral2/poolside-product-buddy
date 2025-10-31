import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [catalogOpen, setCatalogOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="hidden md:block">
          <ProductCatalog isOpen={catalogOpen} setIsOpen={setCatalogOpen} />
        </div>
        
        <div className={cn("transition-all duration-500 pt-40", catalogOpen ? "md:ml-72" : "md:ml-0")}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-bold mb-4">Vaša košarica je prazna</h1>
              <p className="text-muted-foreground mb-8">
                Dodajte proizvode u košaricu da biste nastavili s kupnjom
              </p>
              <Link to="/products">
                <Button 
                  size="lg"
                  className="text-white font-bold"
                  style={{ background: "var(--gradient-water)" }}
                >
                  Pregledajte Proizvode
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog isOpen={catalogOpen} setIsOpen={setCatalogOpen} />
      </div>
      
      <div className={cn("transition-all duration-500 pt-40", catalogOpen ? "md:ml-72" : "md:ml-0")}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Košarica</h1>
              <Button 
                variant="ghost" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Isprazni košaricu
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <Card key={`${item.id}-${item.variantId || 'default'}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {item.image && (
                        <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                          {item.variantSize && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Veličina: {item.variantSize}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <p className="font-bold text-xl sm:text-2xl">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(item.id, item.variantId)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="sticky bottom-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold">Ukupno:</span>
                  <span className="text-3xl font-bold" style={{ 
                    background: "var(--gradient-water)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full text-white font-bold text-lg"
                  style={{ background: "var(--gradient-water)" }}
                  onClick={() => {
                    // Otvoriti chatbot za narudžbu
                    const chatbot = document.querySelector('[data-chatbot]');
                    if (chatbot instanceof HTMLElement) chatbot.click();
                  }}
                >
                  Naruči
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
