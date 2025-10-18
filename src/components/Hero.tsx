import { Link } from "react-router-dom";
import { Filter, Flame, Sparkles, Sun, TestTube, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onVideoEnd: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {

  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      <video
        key="hero-video-v3"
        autoPlay
        muted
        playsInline
        loop
        onEnded={onVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
      >
        <source src="/hero-video.mp4?v=3" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-[1]" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 animate-fade-in max-w-5xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-center text-white drop-shadow-2xl tracking-tight"
              style={{ 
                textShadow: "0 8px 32px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
                lineHeight: "1.1"
              }}>
            Dive into<br />
            <span className="bg-clip-text text-transparent inline-block animate-shimmer"
                  style={{ 
                    background: "linear-gradient(90deg, white, rgba(255,255,255,0.8), white)",
                    WebkitBackgroundClip: "text",
                    backgroundSize: "200% 100%"
                  }}>
              Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-center text-white/95 max-w-3xl mx-auto drop-shadow-lg font-light">
            Otkrijte vrhunska rješenja za bazene s naprednom AI tehnologijom
          </p>
          
          <div className="flex gap-4 justify-center mt-12">
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-8 py-4 rounded-full font-bold text-base text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50"
            >
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              AI Asistent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;