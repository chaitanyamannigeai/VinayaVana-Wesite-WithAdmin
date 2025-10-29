import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function TariffCalculator() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [tariffRates, setTariffRates] = useState({
    regularRate: 3500,
    peakRate: 4500,
    holidayRate: 5000,
  });

  useEffect(() => {
    fetchTariffRates();
  }, []);

  const fetchTariffRates = async () => {
    try {
      const response = await fetch("/api/tariff");
      if (response.ok) {
        const data = await response.json();
        setTariffRates({
          regularRate: data.regularRate,
          peakRate: data.peakRate,
          holidayRate: data.holidayRate,
        });
      }
    } catch (error) {
      console.error("Failed to fetch tariff rates:", error);
    }
  };

  const calculateRate = () => {
    if (!checkIn || !checkOut) return null;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) return null;

    const { regularRate, peakRate, holidayRate } = tariffRates;

    let totalRate = 0;
    let breakdown = [];
    
    const month = start.getMonth();
    const isPeakSeason = month >= 10 || month <= 1;
    
    if (isPeakSeason) {
      totalRate = nights * peakRate;
      breakdown.push({ type: "Peak Season", nights, rate: peakRate });
    } else {
      totalRate = nights * regularRate;
      breakdown.push({ type: "Regular Season", nights, rate: regularRate });
    }

    return { nights, totalRate, breakdown };
  };

  const result = calculateRate();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-2xl">
          <Calendar className="h-6 w-6 text-primary" />
          Tariff Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tariff-checkin">Check-In Date</Label>
            <Input
              id="tariff-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              data-testid="input-tariff-checkin"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tariff-checkout">Check-Out Date</Label>
            <Input
              id="tariff-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              data-testid="input-tariff-checkout"
            />
          </div>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.nights} {item.nights === 1 ? "night" : "nights"} × ₹{item.rate}
                    </span>
                  </div>
                  <span className="font-medium">₹{item.nights * item.rate}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary" data-testid="text-total-tariff">
                  ₹{result.totalRate}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Seasonal Rates:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Regular</p>
                  <p className="font-medium">₹{tariffRates.regularRate.toLocaleString()}/night</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peak (Nov-Feb)</p>
                  <p className="font-medium">₹{tariffRates.peakRate.toLocaleString()}/night</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Holiday</p>
                  <p className="font-medium">₹{tariffRates.holidayRate.toLocaleString()}/night</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
