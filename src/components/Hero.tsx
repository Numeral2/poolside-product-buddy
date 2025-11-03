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
    <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-background/50">
      {/* Lighter overlay */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none z-[0]" />
      
      {/* Elegant Side Gradients - Always visible */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/3 via-primary/2 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary/3 via-primary/2 to-transparent pointer-events-none z-[1]" />
      
      {/* Video on Right Side - Smaller */}
      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-full md:w-[40%] transition-all duration-[2000ms] ease-in-out ${
          videoEnded ? 'translate-x-full opacity-0 scale-110' : 'translate-x-0 opacity-100 scale-100'
        }`}
        style={{ zIndex: 2 }}
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

      {/* Product Showcase - Shows after video ends - RIGHT SIDE */}
      {videoEnded && (
        <div 
          className="absolute top-0 h-full flex items-center animate-fade-in transition-all duration-500" 
          style={{ 
            zIndex: 2,
            right: '2rem',
            width: 'calc(40% - 2rem)',
            justifyContent: 'center'
          }}
        >
          <div className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 px-2">
            {/* Grid layout: 2 on top, 1 on bottom - Responsive */}
            <div className="flex flex-col gap-0.5">
              {/* Top row - 2 images */}
              <div className="flex gap-0.5 justify-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-md p-1 sm:p-1.5 md:p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productPump} alt="Pool Pump" className="w-16 h-20 xs:w-18 xs:h-22 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-32 lg:h-36 object-contain" />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-md p-1 sm:p-1.5 md:p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productControl} alt="Pool Control" className="w-16 h-20 xs:w-18 xs:h-22 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-32 lg:h-36 object-contain" />
                </div>
              </div>
              
              {/* Bottom row - 1 image centered */}
              <div className="flex justify-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-md p-1 sm:p-1.5 md:p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productValve} alt="Pool Valve" className="w-16 h-20 xs:w-18 xs:h-22 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-32 lg:h-36 object-contain" />
                </div>
              </div>
            </div>
            
            <Link 
              to="/products"
              className="group flex items-center gap-1 sm:gap-1.5 md:gap-2 text-foreground hover:text-primary transition-colors duration-300 text-[10px] xs:text-xs sm:text-sm md:text-base no-underline"
            >
              <span className="font-medium whitespace-nowrap">Pogledajte sve proizvode</span>
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
            </Link>
          </div>
        </div>
      )}

      {/* Left Content - CENTERED */}
      <div 
        className="absolute top-0 h-full flex items-center justify-center transition-all duration-500"
        style={{
          zIndex: 10,
          left: 0,
          width: '60%'
        }}
      >
        <div className="max-w-md space-y-2 sm:space-y-3 md:space-y-4 text-center px-4">
          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-2 sm:mb-3">
                CoolPool d.o.o.
              </h1>
              <div className="h-0.5 sm:h-1 w-32 sm:w-40 md:w-48 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground font-light leading-relaxed pt-2 sm:pt-3">
              Službeni partner vodećeg<br />svjetskog proizvođača
            </p>
            <div className="flex justify-center">
              <img 
                src={astralpool} 
                alt="AstralPool" 
                className="h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 object-contain opacity-90"
              />
            </div>
          </div>

          {/* Animated Stats - Show only after video ends */}
          {videoEnded && (
            <div className="space-y-2 sm:space-y-3 md:space-y-4 pt-3 sm:pt-4 md:pt-6 animate-fade-in">
              <div className="flex items-baseline justify-center gap-2 sm:gap-3">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={18} suffix="+" />
                </div>
                <div className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  godina s vama
                </div>
              </div>

              <div className="flex items-baseline justify-center gap-2 sm:gap-3">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={2000} suffix="+" />
                </div>
                <div className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  prodanih proizvoda
                </div>
              </div>

              <div className="flex items-baseline justify-center gap-2 sm:gap-3">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={1000} suffix="+" />
                </div>
                <div className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  zadovoljnih kupaca
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;