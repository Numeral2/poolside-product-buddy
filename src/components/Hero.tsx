import { Link } from "react-router-dom";
import { Filter, Flame, Sparkles, Sun, TestTube, Shield } from "lucide-react";
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
            Dive into Excellence
          </h1>
          
          <p className="text-xl md:text-3xl text-center text-white/95 max-w-3xl drop-shadow-lg font-light">
            Otkrijte vrhunska rješenja za bazene s naprednom AI tehnologijom
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-6 py-3 rounded-full font-semibold text-base text-white shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2 group bg-primary/90 hover:bg-primary"
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