import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-amber-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Estate<span className="text-amber-400">Pro</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              EstatePro is India’s premier real estate consultancy, offering verified residential apartments, luxury villas, independent houses, and land plots across top metro cities.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Property Listings & Legal Due Diligence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-amber-400 transition">All Properties</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition">About EstatePro</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Top Cities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/properties?city=Hyderabad" className="hover:text-amber-400 transition">Properties in Hyderabad</Link>
              </li>
              <li>
                <Link to="/properties?city=Bangalore" className="hover:text-amber-400 transition">Properties in Bangalore</Link>
              </li>
              <li>
                <Link to="/properties?city=Mumbai" className="hover:text-amber-400 transition">Properties in Mumbai</Link>
              </li>
              <li>
                <Link to="/properties?city=Chennai" className="hover:text-amber-400 transition">Properties in Chennai</Link>
              </li>
              <li>
                <Link to="/properties?city=Pune" className="hover:text-amber-400 transition">Properties in Pune</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@estatepro.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EstatePro Real Estate Agency. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Web Development Major Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
