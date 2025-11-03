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
    <div className="relative h-[55vh] md:h-[70vh] w-screen bg-background -mx-[50vw] left-[50%] right-[50%]">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-background/50 to-background pointer-events-none z-[0]" />
      
      {/* Content Container - 1cm from top */}
      <div className="absolute inset-0" style={{ top: '1cm', bottom: 0 }}>
        {/* Left Content - Text Section - Centered horizontally */}
        <div 
          className="absolute left-1/2 top-0 h-full flex items-center -translate-x-[120%]"
          style={{
            zIndex: 10,
            width: '400px',
            maxWidth: '90vw'
          }}
        >
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex flex-col items-start">
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-1 sm:mb-1.5">
                  CoolPool d.o.o.
                </h1>
                <div className="h-0.5 w-24 sm:w-32 md:w-40 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                Službeni partner vodećeg<br />svjetskog proizvođača
              </p>
              <div>
                <img 
                  src={astralpool} 
                  alt="AstralPool" 
                  className="h-7 xs:h-8 sm:h-10 md:h-12 lg:h-14 object-contain opacity-90"
                />
              </div>
            </div>

            {/* Animated Stats - Show only after video ends */}
            {videoEnded && (
              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-2.5 md:pt-3 animate-fade-in">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary tabular-nums">
                    <AnimatedCounter end={18} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                    godina s vama
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary tabular-nums">
                    <AnimatedCounter end={2000} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                    prodanih proizvoda
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary tabular-nums">
                    <AnimatedCounter end={1000} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                    zadovoljnih kupaca
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video on Right Side - Larger */}
        <div 
          className={`absolute left-1/2 top-0 h-full transition-all duration-1000 ease-out ${
            videoEnded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          style={{ 
            zIndex: 2,
            transform: 'translateX(-15%)',
            width: 'min(60%, 700px)',
            maxWidth: '90vw'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-[85%]">
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
          </div>
        </div>

        {/* Product Showcase - Shows after video ends */}
        {videoEnded && (
          <div 
            className="absolute left-1/2 top-0 h-full flex items-center justify-center animate-fade-in" 
            style={{ 
              zIndex: 3,
              transform: 'translateX(-15%)',
              width: 'min(60%, 700px)',
              maxWidth: '90vw'
            }}
          >
            <div className="flex flex-col items-center gap-2 md:gap-3 w-full">
              <div className="flex flex-col gap-1">
                {/* Top row - 2 images */}
                <div className="flex gap-1 justify-center">
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 md:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                    <img src={productPump} alt="Pool Pump" className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-36 lg:h-40 object-contain" />
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 md:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                    <img src={productControl} alt="Pool Control" className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-36 lg:h-40 object-contain" />
                  </div>
                </div>
                
                {/* Bottom row - 1 image centered */}
                <div className="flex justify-center">
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-2 md:p-3 hover:bg-card/70 transition-all duration-300 hover:scale-105 border border-border/50">
                    <img src={productValve} alt="Pool Valve" className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-36 lg:h-40 object-contain" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;