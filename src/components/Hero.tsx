import { useState, useRef, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowRight } from "lucide-react";
import productPump from "@/assets/product-pump.png";
import productControl from "@/assets/product-control.png";
import productValve from "@/assets/product-valve.png";
import astralpool from "@/assets/astralpool-logo.png";

interface HeroProps {
  onVideoEnd?: () => void;
  onOpenCatalog?: () => void;
}

const Hero = ({ onVideoEnd, onOpenCatalog }: HeroProps) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
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
    <div className="relative h-[80vh] w-full overflow-hidden bg-background">
      {/* Top Left - AstralPool Partner Info */}
      <div className="absolute top-8 left-8 z-20 space-y-2">
        <p className="text-sm md:text-base text-muted-foreground font-light">
          Službeni partner vodećeg<br />svjetskog proizvođača
        </p>
        <img 
          src={astralpool} 
          alt="AstralPool" 
          className="h-10 md:h-12 object-contain opacity-90"
        />
      </div>

      {/* Elegant Side Gradients */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-primary/8 via-primary/5 to-transparent pointer-events-none z-[1]" />
      
      {/* Video on Right Side */}
      <div 
        className={`absolute right-0 top-0 h-full w-full md:w-1/2 transition-all duration-[1500ms] ease-out ${
          videoEnded ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{ zIndex: 2 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        >
          <source src="/pool-entry-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Product Showcase - Shows after video ends */}
      {videoEnded && (
        <div className="absolute right-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center animate-fade-in" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center gap-8 px-8">
            {/* Grid layout: 2 on top, 1 on bottom */}
            <div className="flex flex-col gap-6">
              {/* Top row - 2 images */}
              <div className="flex gap-6 justify-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productPump} alt="Pool Pump" className="w-36 h-40 object-contain" />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productControl} alt="Pool Control" className="w-36 h-40 object-contain" />
                </div>
              </div>
              
              {/* Bottom row - 1 image centered */}
              <div className="flex justify-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <img src={productValve} alt="Pool Valve" className="w-36 h-40 object-contain" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleViewProducts}
              className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="text-lg font-medium">Pogledajte sve proizvode</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {/* Left Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-12">
        <div className="max-w-md space-y-6">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-2">
              CoolPool d.o.o.
            </h1>
            <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
          </div>

          {/* Animated Stats - Show only after video ends */}
          {videoEnded && (
            <div className="space-y-4 pt-6 animate-fade-in">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={18} suffix="+" />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  godina s vama
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={2000} suffix="+" />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  prodanih proizvoda
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                  <AnimatedCounter end={1000} suffix="+" />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
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