import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatBot from "@/components/ChatBot";
import ProductCard from "@/components/ProductCard";
import bazeniPlusLogo from "@/assets/bazeniplus-logo.png";
import astralPoolLogo from "@/assets/astralpool-logo.png";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";
import aiLogo from "@/assets/ai-logo.png";
import { Package, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "Filteri",
  "Pumpe",
  "Skimmeri",
  "Osnovna i ABS oprema",
  "PVC cijevi i fitinzi",
  "Rasvjeta",
  "Kemikalije",
  "Pribor za čišćenje",
  "Mozaik",
  "Materijal za oblaganje",
  "Doziranje i elektronika",
  "Efekti",
  "Inox ljestve",
  "Prekrivači",
  "Grijanje",
  "Roboti",
];

const featuredProjects = [
  {
    id: 1,
    name: "Luksuzna Vila s Infinity Bazenom",
    description: "Moderan dizajn s panoramskim pogledom i infinity rubom",
    category: "Infinity Bazeni",
    image: pool1,
  },
  {
    id: 2,
    name: "Nadzemni Bazen Premium",
    description: "Elegantna nadzemna konstrukcija s potpunom opremom",
    category: "Nadzemni Bazeni",
    image: pool2,
  },
  {
    id: 3,
    name: "Obiteljski Bazen",
    description: "Savršen bazen za obitelj s prostranom terasom",
    category: "Obiteljski Bazeni",
    image: pool3,
  },
  {
    id: 4,
    name: "Wellness Centar s Saunom",
    description: "Kompletno wellness rješenje za vaš dom",
    category: "Wellness",
    image: pool4,
  },
  {
    id: 5,
    name: "Hidromasažna Kada Premium",
    description: "Vrhunska hidromasažna kada za potpuno opuštanje",
    category: "Hidromasaža",
    image: pool5,
  },
  {
    id: 6,
    name: "Krovni Bazen",
    description: "Ekskluzivno rješenje za krovne terase",
    category: "Krovni Bazeni",
    image: pool6,
  },
];

const Index = () => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero onVideoEnd={() => setVideoEnded(true)} />
      
      {/* Scrolling Categories Section - overlapping video */}
      <div className="relative overflow-hidden bg-gradient-to-b from-black/20 to-transparent py-8 -mt-20 z-20">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...categories, ...categories].map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="inline-flex items-center px-6 py-2 mx-2 bg-card/70 backdrop-blur-sm rounded-full text-foreground text-sm font-semibold shadow-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer border border-border/50"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      
      {/* AI Choice Section - appears after video ends */}
      {videoEnded && (
        <div className="relative py-20 z-20 bg-gradient-to-b from-background/50 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto text-center">
              <img 
                src={aiLogo} 
                alt="AI Assistant" 
                className="w-32 h-32 object-contain animate-fade-in"
              />
              <h2 className="text-4xl font-bold animate-fade-in">
                Što trebate?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl animate-fade-in">
                <Link to="/products" className="flex-1">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2 h-auto py-4">
                    <Package className="h-6 w-6" />
                    <span className="text-lg">Proizvode za bazen i opremu</span>
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  className="flex-1 bg-secondary hover:bg-secondary/90 gap-2 h-auto py-4"
                  onClick={() => {
                    const chatbot = document.querySelector('[data-chatbot]');
                    if (chatbot instanceof HTMLElement) chatbot.click();
                  }}
                >
                  <Hammer className="h-6 w-6" />
                  <span className="text-lg">Izgradnju bazena</span>
                </Button>
              </div>
              <Button 
                size="lg" 
                variant="outline"
                className="mt-8 animate-fade-in"
                onClick={() => setShowProjects(true)}
              >
                Naši projekti
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Partner Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-muted/30 to-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <img src={bazeniPlusLogo} alt="BazeniPlus" className="h-16 w-auto object-contain" />
            <span className="text-3xl font-light text-foreground/60">+</span>
            <img src={astralPoolLogo} alt="AstralPool" className="h-16 w-auto object-contain" />
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
      
      {/* Featured Projects Section - shown after clicking button */}
      {showProjects && (
        <section className="py-16 px-4 bg-muted/30 animate-fade-in">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Naši Izdvojeni Projekti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProductCard 
                key={project.id} 
                name={project.name}
                description={project.description}
                category={project.category}
                image={project.image}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Pogledajte Sve Proizvode
              </Button>
            </Link>
          </div>
        </div>
        </section>
      )}
      
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
