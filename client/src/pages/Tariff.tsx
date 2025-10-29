import { Button } from "@/components/ui/button";
import TariffCalculator from "@/components/TariffCalculator";
import { Link } from "wouter";
import { ArrowLeft, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tariff() {
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
          <h1 className="font-heading text-4xl font-bold mb-4">Tariff & Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing for your perfect getaway
          </p>
        </div>

        <div className="mb-12">
          <TariffCalculator />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Booking Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium mb-1">Minimum Stay</p>
                <p className="text-muted-foreground">2 nights minimum during regular season, 3 nights during peak season</p>
              </div>
              <div>
                <p className="font-medium mb-1">Cancellation</p>
                <p className="text-muted-foreground">Full refund if cancelled 7 days before check-in</p>
              </div>
              <div>
                <p className="font-medium mb-1">Check-in / Check-out</p>
                <p className="text-muted-foreground">Check-in: 2:00 PM | Check-out: 11:00 AM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                What's Included
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p>Full access to kitchen and cooking facilities</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p>High-speed WiFi throughout the property</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p>Air conditioning in all bedrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p>Free parking on property</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p>Access to coconut grove and garden areas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Prices are subject to change during special holidays and festivals. Please contact us for current rates and availability.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
