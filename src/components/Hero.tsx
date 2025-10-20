import { Search } from "lucide-react";

interface HeroProps {
  onVideoEnd: () => void;
}

const Hero = ({ onVideoEnd }: HeroProps) => {

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
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
        <div className="text-center space-y-6 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white drop-shadow-2xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
            Zaronite u bazen po mjeri.
          </h1>
          
          <p className="text-lg md:text-2xl text-center text-white/95 max-w-3xl mx-auto drop-shadow-lg font-light">
            Najkvalitetnija bazenska oprema i izgradnja bazena na jednom mjestu
          </p>
          
          {/* AI Search */}
          <div className="mt-8">
            <p className="text-base md:text-lg text-white/95 mb-4 drop-shadow-lg">
              Ponude, cijene i kalkulacije za bazene — uz pomoć AI-a!<br />
              Pronađite sve informacije o bazenima jednostavno i brzo.
            </p>
            <button
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
              className="px-6 py-3 rounded-full font-semibold text-base text-white shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group"
              style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              AI Tražilica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;