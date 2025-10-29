import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

interface ContactSettings {
  phone: string;
  email: string;
  whatsappNumber: string;
  address: string;
  googleMapsUrl: string;
  responseTime: string;
}

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setContactInfo(data);
      }
    } catch (error) {
      console.error("Failed to fetch contact information:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (!contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Contact information not available</p>
      </div>
    );
  }

  const addressLines = contactInfo.address.split(", ");

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us for bookings, inquiries, or any assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {addressLines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <a
                    href={contactInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                    data-testid="link-view-map"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  className="w-full gap-2"
                  onClick={() => window.open(`https://wa.me/${contactInfo.whatsappNumber}`, "_blank")}
                  data-testid="button-contact-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                For the fastest response, reach out to us on WhatsApp. We'll help you check availability and confirm your booking within minutes.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Best way to book:</p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Check availability on our homepage</li>
                    <li>Click "Book via WhatsApp" for your preferred dates</li>
                    <li>Confirm your booking with our team</li>
                    <li>Receive booking confirmation and details</li>
                  </ol>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> We respond to all inquiries within {contactInfo.responseTime}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Find Us on the Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-96 rounded-b-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=14.553892,74.315958&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VinayaVana Homestay Location"
                data-testid="map-location"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
