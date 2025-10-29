import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/accommodations", label: "Accommodations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/tariff", label: "Tariff" },
    { href: "/cab-services", label: "Cab Services" },
    { href: "/contact", label: "Contact" },
  ];

  const whatsappNumber = "919371025182";
  const phoneNumber = "+919371025182";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">🌴</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">VinayaVana</h1>
              <p className="text-xs text-muted-foreground -mt-1">Homestay</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(`tel:${phoneNumber}`)}
              data-testid="button-call"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              className="gap-2"
              data-testid="button-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`block py-2 text-sm font-medium ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => window.open(`tel:${phoneNumber}`)}
                className="flex-1"
                data-testid="button-mobile-call"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
                className="flex-1"
                data-testid="button-mobile-whatsapp"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
