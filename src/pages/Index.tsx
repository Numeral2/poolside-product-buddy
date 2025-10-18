import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatBot from "@/components/ChatBot";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* AI-Suggested Products Section */}
      {displayedProducts.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Products We Think You'll Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                  features={product.features}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ChatBot onProductsUpdate={setDisplayedProducts} />
    </div>
  );
};

export default Index;
