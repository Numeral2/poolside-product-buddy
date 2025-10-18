import { Link } from "react-router-dom";
import { Filter, Flame, Sparkles, Sun, TestTube, Shield, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onVideoEnd: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <video
        key="hero-video-v3"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        onEnded={onVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4?v=3" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-[1]" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-center text-white drop-shadow-2xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
            Zaronite u bazen po mjeri.
          </h1>
          
          <p className="text-xl md:text-3xl text-center text-white/95 max-w-3xl mx-auto drop-shadow-lg font-light">
            Najkvalitetnija bazenska oprema i izgradnja bazena na jednom mjestu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;