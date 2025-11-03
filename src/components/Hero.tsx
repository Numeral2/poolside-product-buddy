import { useState, useRef, useEffect } from "react";
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
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  const handleViewProducts = () => {
    onOpenCatalog?.();
  };

  return (
    <div className="relative h-[55vh] md:h-[70vh] w-full bg-background overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-background/50 to-background pointer-events-none z-[0]" />
      
      {/* Content Container */}
      <div className="relative h-full w-full" style={{ paddingTop: '1cm' }}>
        <div className="container mx-auto h-full px-4 md:px-6 lg:px-8 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
            {/* Left Content - Text Section */}
            <div className="space-y-3 md:space-y-4 z-10">
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col items-start">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-2">
                    CoolPool d.o.o.
                  </h1>
                  <div className="h-0.5 w-28 sm:w-36 md:w-40 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  Službeni partner vodećeg<br />svjetskog proizvođača
                </p>
                <div>
                  <img 
                    src={astralpool} 
                    alt="AstralPool" 
                    className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain opacity-90"
                  />
                </div>
              </div>

              {/* Animated Stats - Show only after video ends */}
              {videoEnded && (
                <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 animate-fade-in">
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={18} suffix="+" />
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                      godina s vama
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={2000} suffix="+" />
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                      prodanih proizvoda
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                      <AnimatedCounter end={1000} suffix="+" />
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                      zadovoljnih kupaca
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Video or Product Showcase */}
            <div className="relative h-full flex items-center justify-end">
              {/* Video */}
              <div 
                className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${
                  videoEnded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
                style={{ 
                  zIndex: 2,
                  width: '120%',
                  height: '90%'
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                >
                  <source src="/pool-entry-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Product Showcase - Shows after video ends */}
              {videoEnded && (
                <div className="relative z-3 animate-fade-in flex flex-col items-center gap-3">
                  <div className="flex flex-col gap-2">
                    {/* Top row - 2 images */}
                    <div className="flex gap-2 justify-center">
                      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                        <img src={productPump} alt="Pool Pump" className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                      </div>
                      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                        <img src={productControl} alt="Pool Control" className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                      </div>
                    </div>
                    
                    {/* Bottom row - 1 image centered */}
                    <div className="flex justify-center">
                      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                        <img src={productValve} alt="Pool Valve" className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-40 lg:h-44 object-contain" />
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/products"
                    className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 text-sm md:text-base font-medium no-underline"
                  >
                    <span className="whitespace-nowrap">Pogledajte sve proizvode</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;