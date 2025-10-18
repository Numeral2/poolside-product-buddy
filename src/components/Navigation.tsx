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
import coolpoolLogo from "@/assets/coolpool-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={coolpoolLogo} alt="CoolPool" className="h-10 w-auto object-contain" />
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm text-foreground hover:text-primary transition-colors font-medium"
          >
            Početna
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                Ponuda
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-background z-50">
              <DropdownMenuLabel className="text-primary font-bold">Izgradnja bazena</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Bazeni" className="w-full cursor-pointer">Bazeni</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=SPA kade" className="w-full cursor-pointer">SPA kade</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Saune" className="w-full cursor-pointer">Saune</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Laghetto" className="w-full cursor-pointer">Laghetto</Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-primary font-bold">Oprema za bazene</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Filteri" className="w-full cursor-pointer">Filteri</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Pumpe" className="w-full cursor-pointer">Pumpe</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Skimmeri" className="w-full cursor-pointer">Skimmeri</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Osnovna i ABS oprema" className="w-full cursor-pointer">Osnovna i ABS oprema</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=PVC cijevi i fitinzi" className="w-full cursor-pointer">PVC cijevi i fitinzi</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Rasvjeta" className="w-full cursor-pointer">Rasvjeta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Kemikalije" className="w-full cursor-pointer">Kemikalije</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Pribor za čišćenje" className="w-full cursor-pointer">Pribor za čišćenje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Mozaik" className="w-full cursor-pointer">Mozaik</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Materijal za oblaganje" className="w-full cursor-pointer">Materijal za oblaganje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Doziranje i elektronika" className="w-full cursor-pointer">Doziranje i elektronika</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Efekti" className="w-full cursor-pointer">Efekti</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Inox ljestve" className="w-full cursor-pointer">Inox ljestve</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Prekrivači" className="w-full cursor-pointer">Prekrivači</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Grijanje" className="w-full cursor-pointer">Grijanje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Roboti" className="w-full cursor-pointer">Roboti</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm h-8 px-3">
                <Menu className="h-3.5 w-3.5" />
                Meni
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">Početna</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products" className="w-full">Proizvodi</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signin" className="w-full">Prijava</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup" className="w-full">Registracija</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-2">
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-sm h-8 px-3">
                Prijava
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="text-sm h-8 px-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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