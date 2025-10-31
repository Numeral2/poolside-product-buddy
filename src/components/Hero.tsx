import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Waves, Droplets, Sun } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Waves className="w-24 h-24 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-2000">
          <Droplets className="w-32 h-32 text-white/15" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float animation-delay-4000">
          <Sun className="w-28 h-28 text-white/10" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float animation-delay-1000">
          <Waves className="w-20 h-20 text-white/25" />
        </div>
        
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow animation-delay-3000"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in">
            Vaš Partner za Bazene
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in animation-delay-500">
            Profesionalna oprema, kemija i savjeti za savršen bazen
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-1000">
            <Link to="/products">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 hover-scale transition-all shadow-xl">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pregledaj Proizvode
              </Button>
            </Link>
            <Link to="/projekti">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover-scale transition-all">
                Naši Projekti
              </Button>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in animation-delay-1500">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all hover-scale">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Online Kupovina</h3>
              <p className="text-white/80 text-sm">Brza dostava širom Hrvatske</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all hover-scale">
              <Droplets className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Kvalitetna Oprema</h3>
              <p className="text-white/80 text-sm">Vrhunski brendovi za vaš bazen</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all hover-scale">
              <Sun className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Stručna Podrška</h3>
              <p className="text-white/80 text-sm">Savjeti za održavanje bazena</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
