import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCard from "@/components/ProductCard";
import bazeniPlusLogo from "@/assets/bazeniplus-logo.png";
import astralPoolLogo from "@/assets/astralpool-logo.png";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";
import { Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "Bazeni",
  "SPA kade",
  "Saune",
  "Laghetto",
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero onVideoEnd={() => setVideoEnded(true)} />
      {/* Scrolling Categories Section */}
      <div className="relative overflow-hidden py-12 -mt-24 z-20">
        <div className="absolute inset-0 backdrop-blur-xl bg-background/40" />
        <div className="relative z-10">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...categories, ...categories].map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category}`}
                className="inline-flex items-center px-8 py-4 mx-3 glass-effect rounded-full text-foreground text-base font-bold shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer border-2 border-primary/30 hover:border-primary group relative overflow-hidden"
              >
                <span className="relative z-10">{category}</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Partner Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-glass)" }} />
        <div className="absolute inset-0 backdrop-blur-xl" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="glass-effect rounded-3xl p-12 border-2 border-primary/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <img src={bazeniPlusLogo} alt="BazeniPlus" className="h-20 w-auto object-contain filter drop-shadow-lg" />
              </div>
              <div className="h-20 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
              <div className="transform hover:scale-110 transition-transform duration-300">
                <img src={astralPoolLogo} alt="AstralPool" className="h-20 w-auto object-contain filter drop-shadow-lg" />
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Partnerstvo Izvrsnosti</h3>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Nudimo izgradnju bazena te proizvode za opremanje bazena.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, profesionalnu ugradnju i potpunu tehničku podršku.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed font-semibold">
                Uz nas dobivate kvalitetu, pouzdan servis i dugotrajan užitak u savršeno funkcionalnom bazenu.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section - Horizontal Scroll */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" 
               style={{ background: "var(--gradient-water)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" 
               style={{ background: "var(--gradient-ai)" }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent"
                style={{ 
                  background: "var(--gradient-water)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
              Naši Izdvojeni Projekti
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Otkrijte naša najluksuznija rješenja i inspirišite se za svoj projekt
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide px-4 md:px-8">
          <div className="flex gap-6 pb-6" style={{ width: "max-content", paddingLeft: "max(1rem, calc(50vw - 600px))" }}>
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="w-[320px] flex-shrink-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard 
                  name={project.name}
                  description={project.description}
                  category={project.category}
                  image={project.image}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/products">
            <Button 
              size="lg" 
              className="text-white font-bold shadow-lg hover:scale-105 transition-all duration-300 text-lg px-10 py-7 rounded-full group relative overflow-hidden"
              style={{ background: "var(--gradient-water)", boxShadow: "var(--shadow-float)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Pogledajte Sve Proizvode
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Button>
          </Link>
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
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ModernChatBot />
    </div>
  );
};

export default Index;
