import { Link } from "react-router-dom";
import { Filter, Flame, Sparkles, Sun, TestTube, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onVideoEnd: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        key="hero-video-v3"
        autoPlay
        muted
        playsInline
        loop
        onEnded={onVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4?v=3" type="video/mp4" />
      </video>
      
      {/* Subtle Overlay for Text Readability with smooth bottom transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent z-[1]" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 text-white drop-shadow-2xl">
          Dive into Excellence
        </h1>
        <p className="text-xl md:text-2xl text-center text-white/95 max-w-2xl mb-8 drop-shadow-lg">
          Discover premium pool solutions that transform your backyard into a paradise
        </p>
      </div>
    </div>
  );
};

export default Hero;