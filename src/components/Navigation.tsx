import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import bazeniPlusLogo from "@/assets/bazeniplus-nav-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src={bazeniPlusLogo} 
            alt="BazeniPlus" 
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
          />
        </Link>
        
        <div className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-bold text-lg relative group"
          >
            Početna
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-foreground hover:text-primary transition-colors font-bold text-lg flex items-center gap-2 group">
                Ponuda
                <ChevronDown className="h-5 w-5 transition-transform group-hover:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-card backdrop-blur-xl z-50 border-2 border-primary/20 shadow-2xl p-2">
              <DropdownMenuLabel className="text-primary font-bold text-base py-3 px-3"
                                 style={{ 
                                   background: "var(--gradient-glass)",
                                   borderRadius: "0.5rem",
                                   marginBottom: "0.5rem"
                                 }}>
                🏗️ Izgradnja bazena
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Bazeni" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Bazeni</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=SPA kade" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">SPA kade</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Saune" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Saune</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Laghetto" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Laghetto</Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuLabel className="text-primary font-bold text-base py-3 px-3"
                                 style={{ 
                                   background: "var(--gradient-glass)",
                                   borderRadius: "0.5rem",
                                   marginBottom: "0.5rem"
                                 }}>
                🏊 Oprema za bazene
              </DropdownMenuLabel>
              <div className="max-h-64 overflow-y-auto scrollbar-thin">
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Filteri" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Filteri</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Pumpe" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Pumpe</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Skimmeri" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Skimmeri</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Osnovna i ABS oprema" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Osnovna i ABS oprema</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=PVC cijevi i fitinzi" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">PVC cijevi i fitinzi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Rasvjeta" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Rasvjeta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Kemikalije" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Kemikalije</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Pribor za čišćenje" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Pribor za čišćenje</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Mozaik" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Mozaik</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Materijal za oblaganje" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Materijal za oblaganje</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Doziranje i elektronika" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Doziranje i elektronika</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Efekti" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Efekti</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Inox ljestve" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Inox ljestve</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Prekrivači" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Prekrivači</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Grijanje" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Grijanje</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products?category=Roboti" className="w-full cursor-pointer py-2 px-3 rounded-lg hover:bg-primary/10 font-semibold">Roboti</Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full font-semibold">Početna</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products" className="w-full font-semibold">Proizvodi</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/signin" className="w-full font-semibold">Prijava</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup" className="w-full font-semibold">Registracija</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden lg:flex gap-4">
            <Link to="/signin">
              <Button 
                variant="ghost" 
                className="font-bold hover:bg-primary/10"
              >
                Prijava
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                className="font-bold text-white shadow-lg hover:scale-105 transition-all"
                style={{ background: "var(--gradient-water)" }}
              >
                Registracija
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;