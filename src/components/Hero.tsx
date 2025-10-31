import { Search } from "lucide-react";

interface HeroProps {
  onVideoEnd: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background image */}
      <img 
        src="/hero-poster.png"
        alt="Pool background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(1.1)" }}
        loading="eager"
        decoding="sync"
      />
      
      <div className="absolute inset-0 z-[1]" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white drop-shadow-2xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
            Zaronite u bazen po mjeri.
          </h1>
          
          <p className="text-lg md:text-2xl text-center text-white/95 max-w-3xl mx-auto drop-shadow-lg font-light">
            Najkvalitetnija bazenska oprema i AI asistent za sve vaše potrebe
          </p>
          
          {/* AI Search */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-8 py-4 rounded-full font-semibold text-lg text-white shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2 group animate-pulse"
              style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
            >
              <Search className="h-6 w-6" />
              AI Tražilica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;