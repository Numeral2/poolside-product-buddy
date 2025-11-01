import { useState } from "react";
import { Search } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import astralpool from "@/assets/astralpool-logo.png";

interface HeroProps {
  onVideoEnd?: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-background">
      {/* Elegant Side Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary/5 via-primary/10 to-transparent pointer-events-none z-[1]" />
      
      {/* Video on Right Side */}
      <div 
        className={`absolute right-0 top-0 h-full w-full md:w-1/2 transition-transform duration-1000 ease-in-out ${
          videoEnded ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ zIndex: 2 }}
      >
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        >
          <source src="/pool-entry-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Left Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-12 lg:px-20">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              CoolPool d.o.o.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Službeni partner vodećeg svjetskog proizvođača
            </p>
            <img 
              src={astralpool} 
              alt="AstralPool" 
              className="h-16 object-contain"
            />
          </div>

          {/* Animated Stats */}
          <div className="space-y-6 pt-4">
            <div className="flex items-baseline gap-3">
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <AnimatedCounter end={18} suffix="+" />
              </div>
              <div className="text-xl md:text-2xl text-foreground font-semibold">
                godina sa vama
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                <AnimatedCounter end={2000} suffix="+" />
              </div>
              <div className="text-lg md:text-xl text-foreground">
                prodanih proizvoda
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                <AnimatedCounter end={1000} suffix="+" />
              </div>
              <div className="text-lg md:text-xl text-foreground">
                zadovoljnih kupaca
              </div>
            </div>
          </div>

          {/* AI Search Button */}
          <div className="pt-6">
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-8 py-4 rounded-lg font-semibold text-base bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2 group"
            >
              <Search className="h-5 w-5" />
              AI Tražilica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;