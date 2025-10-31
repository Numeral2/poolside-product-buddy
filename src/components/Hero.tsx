import { Search } from "lucide-react";

interface HeroProps {
  onVideoEnd?: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        onEnded={onVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.9)" }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-[1]" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-white drop-shadow-2xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
            Zaronite u bazen po mjeri.
          </h1>
          
          <p className="text-base md:text-xl text-center text-white/95 max-w-2xl mx-auto drop-shadow-lg font-light">
            Najkvalitetnija bazenska oprema i AI asistent za sve vaše potrebe
          </p>
          
          {/* AI Search */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-6 py-3 rounded-full font-semibold text-base text-white shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2 group animate-pulse"
              style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
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