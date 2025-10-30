import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MessageCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Suggestion = { checkIn: string; checkOut: string };
type Result =
  | {
      ok: true;
      available: boolean;
      rate?: number;
      message: string;
      suggestions: Suggestion[];
    }
  | {
      ok: false;
      message: string;
    };

function isValidISO(date: string) {
  // YYYY-MM-DD quick check
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date));
}

function nightsBetween(checkIn: string, checkOut: string) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  return Math.max(0, Math.round((+b - +a) / (1000 * 60 * 60 * 24)));
}

export default function AvailabilityChecker() {
  const [unit, setUnit] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const canSubmit = useMemo(() => {
    if (!unit || !checkIn || !checkOut || checking) return false;
    if (!isValidISO(checkIn) || !isValidISO(checkOut)) return false;
    return new Date(checkIn) < new Date(checkOut);
  }, [unit, checkIn, checkOut, checking]);

  const handleCheckAvailability = async () => {
    // basic client-side validation
    if (!unit || !checkIn || !checkOut) return;
    if (!isValidISO(checkIn) || !isValidISO(checkOut)) {
      setResult({ ok: false, message: "Please use valid dates (YYYY-MM-DD)." });
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      setResult({ ok: false, message: "Check-out must be after check-in." });
      return;
    }

    setChecking(true);
    setResult(null);
    try {
      const params = new URLSearchParams({ unit, checkIn, checkOut });
      const res = await fetch(`/api/availability?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({
          ok: false,
          message: data?.error || "Could not check availability. Please try again.",
        });
        return;
      }

      // example rate calc: ₹3500/night (customize as you like)
      const nights = nightsBetween(checkIn, checkOut);
      const ratePerNight = 4500;
      const totalRate = data.available ? ratePerNight : undefined;

      setResult({
        ok: true,
        available: Boolean(data.available),
        rate: totalRate,
        message: data.available
          ? `Great news! The unit is available for ${nights} night${nights === 1 ? "" : "s"}.`
          : "Sorry, the unit is booked for these dates.",
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
      });
    } catch (e: any) {
      setResult({
        ok: false,
        message: e?.message || "Network error. Please try again.",
      });
    } finally {
      setChecking(false);
    }
  };

  const sendWhatsAppMessage = (suggestion?: Suggestion) => {
    const dates = suggestion
      ? `${suggestion.checkIn} to ${suggestion.checkOut}`
      : `${checkIn} to ${checkOut}`;
    const message = suggestion
      ? `Hi VinayaVana, my preferred dates (${checkIn} to ${checkOut}) are booked — please check availability for ${dates}.`
      : `Hi VinayaVana, I'd like to book ${unit} from ${dates}. Please confirm availability.`;
    window.open(
      `https://wa.me/919371025182?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Card id="check-availability" className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-2xl">
          <Calendar className="h-6 w-6 text-primary" />
          Check Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unit">Select Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit" data-testid="select-unit">
                <SelectValue placeholder="Choose unit" />
              </SelectTrigger>
              <SelectContent>
                {/* Keep these values in sync with your server's unit IDs */}
                <SelectItem value="2nd-floor">2nd Floor Suite</SelectItem>
                <SelectItem value="ground-floor">Ground Floor (Coming Soon)</SelectItem>
                <SelectItem value="cottage-1">Cottage 1 (Coming Soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-in">Check-In</Label>
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              data-testid="input-check-in"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-out">Check-Out</Label>
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              data-testid="input-check-out"
            />
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleCheckAvailability}
          disabled={!canSubmit}
          data-testid="button-check-availability"
        >
          {checking ? "Checking..." : "Check Availability"}
        </Button>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            {/* Error state */}
            {!result.ok ? (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertCircle className="h-5 w-5 mt-0.5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">{result.message}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Success / availability state */}
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    result.available
                      ? "bg-green-50 dark:bg-green-950/20"
                      : "bg-red-50 dark:bg-red-950/20"
                  }`}
                >
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${
                      result.available ? "text-green-600" : "text-red-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{result.message}</p>
                    {result.available && result.rate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Rate: ₹{result.rate} per night
                      </p>
                    )}
                  </div>
                </div>

                {result.available ? (
                  <Button
                    className="w-full gap-2"
                    onClick={() => sendWhatsAppMessage()}
                    data-testid="button-book-whatsapp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Book via WhatsApp
                  </Button>
                ) : (
                  result.suggestions.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Alternative dates available:</p>
                      <div className="grid gap-2">
                        {result.suggestions.map((suggestion, index) => (
                          <div
                            key={`${suggestion.checkIn}_${suggestion.checkOut}_${index}`}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{suggestion.checkIn}</Badge>
                              <span className="text-sm">to</span>
                              <Badge variant="outline">{suggestion.checkOut}</Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => sendWhatsAppMessage(suggestion)}
                              data-testid={`button-suggest-${index}`}
                            >
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Inquire
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
