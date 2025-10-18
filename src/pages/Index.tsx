import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatBot from "@/components/ChatBot";
import ProductCard from "@/components/ProductCard";
import bazeniPlusLogo from "@/assets/bazeniplus-logo.png";
import astralPoolLogo from "@/assets/astralpool-logo.png";

const Index = () => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Partner Section with gradient transition */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-muted/30 to-muted/50 -mt-20 pt-24">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
            <img src={bazeniPlusLogo} alt="BazeniPlus" className="h-16 object-contain" />
            <img src={astralPoolLogo} alt="AstralPool" className="h-16 object-contain" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, profesionalnu ugradnju i potpunu tehničku podršku.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Uz nas dobivate kvalitetu, pouzdan servis i dugotrajan užitak u savršeno funkcionalnom bazenu.
            </p>
          </div>
        </div>
      </section>
      
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
