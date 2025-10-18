import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import bazeniPlusLogo from "@/assets/bazeniplus-nav-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={bazeniPlusLogo} alt="BazeniPlus" className="h-12 w-auto object-contain" />
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-semibold"
          >
            Početna
          </Link>
          <Link 
            to="/products" 
            className="text-foreground hover:text-primary transition-colors font-semibold"
          >
            Proizvodi
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Menu className="h-4 w-4" />
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

          <div className="flex gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Prijava
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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