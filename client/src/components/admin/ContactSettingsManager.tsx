import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface ContactSettings {
  phone: string;
  email: string;
  whatsappNumber: string;
  address: string;
  googleMapsUrl: string;
  responseTime: string;
}

export default function ContactSettingsManager() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>({
    phone: "",
    email: "",
    whatsappNumber: "",
    address: "",
    googleMapsUrl: "",
    responseTime: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setSettings({
          phone: data.phone,
          email: data.email,
          whatsappNumber: data.whatsappNumber,
          address: data.address,
          googleMapsUrl: data.googleMapsUrl,
          responseTime: data.responseTime,
        });
      }
    } catch (error) {
      console.error("Failed to fetch contact settings:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact settings");
      }

      toast({
        title: "Success",
        description: "Contact information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update contact settings",
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
          <Mail className="h-5 w-5" />
          Contact Information
        </CardTitle>
        <CardDescription>
          Update contact details displayed on the contact page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                required
                placeholder="+919371025182"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                required
                placeholder="919371025182"
              />
              <p className="text-xs text-muted-foreground">Without + prefix</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
              placeholder="stay.vinayavana@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              required
              rows={3}
              placeholder="VinayaVana Homestay, Hanehelli, Near Ramanath Rice Mill..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
            <Input
              id="googleMapsUrl"
              type="url"
              value={settings.googleMapsUrl}
              onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
              required
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responseTime">Response Time Message</Label>
            <Input
              id="responseTime"
              value={settings.responseTime}
              onChange={(e) => setSettings({ ...settings, responseTime: e.target.value })}
              required
              placeholder="1-2 hours during business hours (9 AM - 8 PM IST)"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
