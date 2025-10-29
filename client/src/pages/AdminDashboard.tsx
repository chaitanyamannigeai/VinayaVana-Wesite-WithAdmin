import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, DollarSign, Car, Calendar, Lock, Mail } from "lucide-react";
import TariffManager from "@/components/admin/TariffManager";
import CabDestinationManager from "@/components/admin/CabDestinationManager";
import BookingManager from "@/components/admin/BookingManager";
import ChangePassword from "@/components/admin/ChangePassword";
import ContactSettingsManager from "@/components/admin/ContactSettingsManager";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        throw new Error("Not authenticated");
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue",
        variant: "destructive",
      });
      setLocation("/admin/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your property settings</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="tariff" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="tariff" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Tariff
            </TabsTrigger>
            <TabsTrigger value="cabs" className="gap-2">
              <Car className="h-4 w-4" />
              Cabs
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Lock className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tariff">
            <TariffManager />
          </TabsContent>

          <TabsContent value="cabs">
            <CabDestinationManager />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactSettingsManager />
          </TabsContent>

          <TabsContent value="settings">
            <ChangePassword />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
