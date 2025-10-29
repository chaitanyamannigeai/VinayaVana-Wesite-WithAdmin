import { Link } from "wouter";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🌴</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">VinayaVana</h3>
                <p className="text-xs text-muted-foreground">Homestay</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A serene 1-acre retreat surrounded by coconut and betelnut trees near Gokarna.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/accommodations">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Accommodations
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Reviews
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cab-services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Cab Services
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Hanehelli, Near Ramanath Rice Mill, Bankikodla Rd, Gokarna, Karnataka 581326</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919371025182" className="text-muted-foreground hover:text-primary">
                  +919371025182
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:stay.vinayavana@gmail.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  stay.vinayavana@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Book your stay or inquire about availability via WhatsApp.
            </p>
            <Button
              className="w-full gap-2"
              onClick={() => window.open("https://wa.me/919371025182", "_blank")}
              data-testid="button-footer-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 VinayaVana Homestay. Family-owned heritage property.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>🌴</span>
            <span>Eco-Friendly Stay</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 animate-pulse"
          onClick={() => window.open("https://wa.me/919371025182", "_blank")}
          data-testid="button-floating-whatsapp"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </footer>
  );
}
