import { Link } from "react-router-dom";
import { Truck, CreditCard, RotateCcw, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Info Bar */}
      <div className="bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg hover-scale">
              <Truck className="w-10 h-10 text-blue-400" />
              <div>
                <h4 className="font-semibold text-lg">Brza Dostava</h4>
                <p className="text-sm text-gray-300">Dostava 2-5 radnih dana širom Hrvatske</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg hover-scale">
              <CreditCard className="w-10 h-10 text-blue-400" />
              <div>
                <h4 className="font-semibold text-lg">Sigurna Plaćanja</h4>
                <p className="text-sm text-gray-300">Kartica, PayPal ili pouzećem</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg hover-scale">
              <RotateCcw className="w-10 h-10 text-blue-400" />
              <div>
                <h4 className="font-semibold text-lg">Povrat u 14 dana</h4>
                <p className="text-sm text-gray-300">Povrat novca bez postavljanja pitanja</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Bazeni Plus</h3>
            <p className="text-gray-400 text-sm">
              Vaš pouzdani partner za opremu za bazene, kemiju i održavanje. Profesionalna usluga od 2005. godine.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Brzi Linkovi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors story-link">
                  Proizvodi
                </Link>
              </li>
              <li>
                <Link to="/projekti" className="text-gray-400 hover:text-white transition-colors story-link">
                  Projekti
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors story-link">
                  Košarica
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Informacije</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors story-link">
                  Dostava i plaćanje
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors story-link">
                  Uvjeti korištenja
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors story-link">
                  Politika privatnosti
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors story-link">
                  Reklamacije
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+385 1 234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@bazeniplus.hr</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Zagreb, Hrvatska</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Bazeni Plus. Sva prava pridržana.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
