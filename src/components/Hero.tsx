import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Flame, Sparkles, Sun, TestTube, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryButtons = [
  { icon: Filter, label: "Filters", position: "left-[8%] top-[25%]" },
  { icon: Flame, label: "Heaters", position: "left-[5%] top-[50%]" },
  { icon: Sparkles, label: "Cleaners", position: "left-[10%] bottom-[20%]" },
  { icon: Sun, label: "Lighting", position: "right-[8%] top-[20%]" },
  { icon: TestTube, label: "Chemicals", position: "right-[12%] top-[55%]" },
  { icon: Shield, label: "Covers", position: "right-[6%] bottom-[25%]" },
];

const Hero = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Subtle Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background/60" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 text-white drop-shadow-2xl">
          Dive into Excellence
        </h1>
        <p className="text-xl md:text-2xl text-center text-white/95 max-w-2xl mb-8 drop-shadow-lg">
          Discover premium pool solutions that transform your backyard into a paradise
        </p>
      </div>

      {/* Animated Category Buttons */}
      {categoryButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <Link
            key={button.label}
            to={`/products?category=${button.label}`}
            className={cn(
              "absolute group cursor-pointer transition-all duration-500",
              button.position,
              videoEnded 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: `${index * 100}ms`,
              animation: videoEnded ? "float 3s ease-in-out infinite" : "none",
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="flex items-center overflow-hidden rounded-full shadow-2xl hover:shadow-accent/50 transition-all duration-300">
              {/* Icon Section */}
              <div 
                className="p-4 bg-gradient-to-br from-accent to-accent/80 text-white group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Icon className="h-6 w-6" />
              </div>
              
              {/* Label Section */}
              <div className="px-6 py-3 bg-gradient-to-r from-card to-card/95 backdrop-blur-sm group-hover:from-primary group-hover:to-primary/90 transition-all duration-300">
                <span className="text-foreground group-hover:text-white font-semibold whitespace-nowrap">
                  {button.label}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hero;