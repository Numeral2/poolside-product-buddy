import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowRight } from "lucide-react";
import productPump from "@/assets/product-pump.png";
import productControl from "@/assets/product-control.png";
import productValve from "@/assets/product-valve.png";
import astralpool from "@/assets/astralpool-logo.png";

interface HeroProps {
  onVideoEnd?: () => void;
  onOpenCatalog?: () => void;
  catalogOpen?: boolean;
}

const Hero = ({ onVideoEnd, onOpenCatalog, catalogOpen = true }: HeroProps) => {
  useEffect(() => {
    // Trigger video end callback on mount since we're not using video
    onVideoEnd?.();
  }, [onVideoEnd]);

  return (
    <div className="relative min-h-[50vh] md:h-[60vh] lg:h-[70vh] w-screen bg-background overflow-hidden py-8 md:py-12">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-background/50 to-background pointer-events-none z-[0]" />
      
      {/* Content Container */}
      <div className="relative h-full w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 w-full items-center">
            {/* Left Content - Text Section */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 z-10">
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col items-start">
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-1 sm:mb-2">
                    CoolPool d.o.o.
                  </h1>
                  <div className="h-0.5 w-20 sm:w-28 md:w-40 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
                </div>
                
                <p className="text-xs sm:text-sm md:text-lg text-muted-foreground font-light leading-relaxed">
                  Službeni partner vodećeg<br />svjetskog proizvođača
                </p>
                <div>
                  <img 
                    src={astralpool} 
                    alt="AstralPool" 
                    className="h-8 sm:h-10 md:h-14 lg:h-16 object-contain opacity-90"
                  />
                </div>
              </div>

              {/* Animated Stats */}
              <div className="space-y-1 sm:space-y-2 md:space-y-3 pt-2 sm:pt-3 md:pt-4 animate-fade-in">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={18} suffix="+" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg text-muted-foreground font-medium">
                      godina s vama
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={2000} suffix="+" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg text-muted-foreground font-medium">
                      prodanih proizvoda
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={1000} suffix="+" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg text-muted-foreground font-medium">
                      zadovoljnih kupaca
                    </div>
                  </div>
                </div>
              </div>

            {/* Right Side - Product Showcase */}
            <div className="relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative flex items-center justify-center animate-fade-in">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      {/* Top row - 2 images */}
                      <div className="flex gap-1.5 sm:gap-2 justify-center">
                        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                          <img src={productPump} alt="Pool Pump" className="w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                          <img src={productControl} alt="Pool Control" className="w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                        </div>
                      </div>
                      
                      {/* Bottom row - 1 image centered */}
                      <div className="flex justify-center">
                        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                          <img src={productValve} alt="Pool Valve" className="w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to="/products"
                      className="group flex items-center gap-1.5 sm:gap-2 text-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm md:text-base font-medium no-underline"
                    >
                      <span className="whitespace-nowrap">Pogledajte sve proizvode</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;