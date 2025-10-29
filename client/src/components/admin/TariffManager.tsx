import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee } from "lucide-react";

interface TariffSettings {
  regularRate: number;
  peakRate: number;
  holidayRate: number;
}

export default function TariffManager() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<TariffSettings>({
    regularRate: 3500,
    peakRate: 4500,
    holidayRate: 5000,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/tariff");
      if (response.ok) {
        const data = await response.json();
        setSettings({
          regularRate: data.regularRate,
          peakRate: data.peakRate,
          holidayRate: data.holidayRate,
        });
      }
    } catch (error) {
      console.error("Failed to fetch tariff settings:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/tariff", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update tariff");
      }

      toast({
        title: "Success",
        description: "Tariff rates updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update tariff",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5" />
          Tariff Settings
        </CardTitle>
        <CardDescription>
          Update the room rates for different seasons
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="regularRate">Regular Rate (₹/night)</Label>
              <Input
                id="regularRate"
                type="number"
                value={settings.regularRate}
                onChange={(e) => setSettings({ ...settings, regularRate: parseInt(e.target.value) })}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakRate">Peak Rate (₹/night)</Label>
              <Input
                id="peakRate"
                type="number"
                value={settings.peakRate}
                onChange={(e) => setSettings({ ...settings, peakRate: parseInt(e.target.value) })}
                required
                min="0"
              />
              <p className="text-xs text-muted-foreground">Nov-Feb</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="holidayRate">Holiday Rate (₹/night)</Label>
              <Input
                id="holidayRate"
                type="number"
                value={settings.holidayRate}
                onChange={(e) => setSettings({ ...settings, holidayRate: parseInt(e.target.value) })}
                required
                min="0"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
