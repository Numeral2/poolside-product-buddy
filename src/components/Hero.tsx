import { useState, useRef, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";
import astralpool from "@/assets/astralpool-logo.png";

interface HeroProps {
  onVideoEnd?: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-background">
      {/* Elegant Side Gradients */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-primary/8 via-primary/5 to-transparent pointer-events-none z-[1]" />
      
      {/* Video on Right Side */}
      <div 
        className={`absolute right-0 top-0 h-full w-full md:w-1/2 transition-transform duration-1000 ease-in-out ${
          videoEnded ? 'translate-x-full' : 'translate-x-0'
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

      {/* Left Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-12 lg:px-20">
        <div className="max-w-xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              CoolPool d.o.o.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Službeni partner vodećeg<br />svjetskog proizvođača
            </p>
            <img 
              src={astralpool} 
              alt="AstralPool" 
              className="h-12 md:h-14 object-contain opacity-90"
            />
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