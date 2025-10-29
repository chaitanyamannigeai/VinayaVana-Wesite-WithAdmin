import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Car, Edit, Trash2, Plus } from "lucide-react";

interface CabDestination {
  id: string;
  destinationName: string;
  distance: string;
  duration: string;
  driverName: string;
  driverPhone: string;
  description: string;
  displayOrder: number;
}

export default function CabDestinationManager() {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<CabDestination[]>([]);
  const [editingDestination, setEditingDestination] = useState<CabDestination | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/cab-destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDestination) return;

    try {
      const url = editingDestination.id && editingDestination.id.length > 5
        ? `/api/admin/cab-destinations/${editingDestination.id}`
        : "/api/admin/cab-destinations";

      const method = editingDestination.id && editingDestination.id.length > 5 ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDestination),
      });

      if (!response.ok) {
        throw new Error("Failed to save destination");
      }

      toast({
        title: "Success",
        description: "Cab destination saved successfully",
      });

      setIsDialogOpen(false);
      setEditingDestination(null);
      fetchDestinations();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save destination",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      const response = await fetch(`/api/admin/cab-destinations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete destination");
      }

      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });

      fetchDestinations();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete destination",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (destination?: CabDestination) => {
    if (destination) {
      setEditingDestination(destination);
    } else {
      setEditingDestination({
        id: "",
        destinationName: "",
        distance: "",
        duration: "",
        driverName: "",
        driverPhone: "",
        description: "",
        displayOrder: destinations.length + 1,
      });
    }
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Cab Destinations
            </CardTitle>
            <CardDescription>
              Manage cab service destinations and driver details
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openEditDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Destination
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDestination?.id && editingDestination.id.length > 5 ? "Edit" : "Add"} Destination
                </DialogTitle>
                <DialogDescription>
                  Enter the destination and driver details
                </DialogDescription>
              </DialogHeader>
              {editingDestination && (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="destinationName">Destination Name</Label>
                      <Input
                        id="destinationName"
                        value={editingDestination.destinationName}
                        onChange={(e) => setEditingDestination({ ...editingDestination, destinationName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="distance">Distance</Label>
                      <Input
                        id="distance"
                        placeholder="e.g., 45 km"
                        value={editingDestination.distance}
                        onChange={(e) => setEditingDestination({ ...editingDestination, distance: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 1.5 hours"
                        value={editingDestination.duration}
                        onChange={(e) => setEditingDestination({ ...editingDestination, duration: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayOrder">Display Order</Label>
                      <Input
                        id="displayOrder"
                        type="number"
                        value={editingDestination.displayOrder}
                        onChange={(e) => setEditingDestination({ ...editingDestination, displayOrder: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="driverName">Driver Name</Label>
                      <Input
                        id="driverName"
                        value={editingDestination.driverName}
                        onChange={(e) => setEditingDestination({ ...editingDestination, driverName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverPhone">Driver Phone</Label>
                      <Input
                        id="driverPhone"
                        placeholder="918073962970"
                        value={editingDestination.driverPhone}
                        onChange={(e) => setEditingDestination({ ...editingDestination, driverPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editingDestination.description}
                      onChange={(e) => setEditingDestination({ ...editingDestination, description: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell className="font-medium">{destination.destinationName}</TableCell>
                <TableCell>{destination.distance}</TableCell>
                <TableCell>{destination.driverName}</TableCell>
                <TableCell>{destination.driverPhone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(destination)}
                      className="gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(destination.id)}
                      className="gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
