import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  UtensilsCrossed,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  ChefHat,
} from "lucide-react";

interface MealAuraPartnerDashboardProps {
  partnerName: string;
}

const mockServices = [
  {
    id: 1,
    name: "Weekly Meal Plan",
    price: "₹5,000",
    duration: "7 days",
    active: true,
    description:
      "Customized weekly meal plan with grocery list",
  },
  {
    id: 2,
    name: "Monthly Meal Subscription",
    price: "₹18,000",
    duration: "30 days",
    active: true,
    description: "Complete monthly meal planning and delivery",
  },
  {
    id: 3,
    name: "Diabetic Meal Plan",
    price: "₹6,500",
    duration: "7 days",
    active: true,
    description: "Specialized meal plan for diabetic seniors",
  },
];

const mockBookingRequests = [
  {
    id: 1,
    service: "Weekly Meal Plan",
    clientName: "Lakshmi Iyer",
    date: "2025-11-10",
    time: "10:00 AM",
    address: "E-234, Lajpat Nagar, Delhi",
    phone: "+91 9876543214",
    price: "₹5,000",
    dietType: "Vegetarian, Low Sodium",
    allergies: "Nuts, Dairy",
    mealPreferences: "South Indian cuisine preferred",
  },
  {
    id: 2,
    service: "Diabetic Meal Plan",
    clientName: "Ramesh Gupta",
    date: "2025-11-11",
    time: "11:00 AM",
    address: "F-567, Dwarka, Delhi",
    phone: "+91 9876543215",
    price: "₹6,500",
    dietType: "Diabetic-friendly, Low carb",
    allergies: "None",
    mealPreferences: "North Indian, less spicy",
  },
];

const mockAcceptedBookings = [
  {
    id: 3,
    service: "Monthly Meal Subscription",
    clientName: "Sunita Reddy",
    date: "2025-11-01",
    time: "9:00 AM",
    address: "G-890, Rohini, Delhi",
    price: "₹18,000",
    dietType: "Vegetarian, Gluten-free",
    allergies: "Gluten",
    mealPreferences: "Variety of cuisines, low oil",
  },
];

const serviceExamples = [
  "Heart-Healthy Meal Plan",
  "Kidney-Friendly Diet",
  "Weight Management Plan",
  "High Protein Senior Diet",
  "Soft Food Meal Plan",
  "Custom Nutrition Coaching",
];

export function MealAuraPartnerDashboard({
  partnerName,
}: MealAuraPartnerDashboardProps) {
  const [bookingRequests, setBookingRequests] = useState(
    mockBookingRequests,
  );
  const [acceptedBookings, setAcceptedBookings] = useState(
    mockAcceptedBookings,
  );
  const [services, setServices] = useState(mockServices);
  const [showAddServiceDialog, setShowAddServiceDialog] =
    useState(false);
  const [showEditServiceDialog, setShowEditServiceDialog] =
    useState(false);
  const [selectedService, setSelectedService] =
    useState<any>(null);

  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] =
    useState("");
  const [newServiceDescription, setNewServiceDescription] =
    useState("");

  const handleAcceptBooking = (bookingId: number) => {
    const booking = bookingRequests.find(
      (b) => b.id === bookingId,
    );
    if (booking) {
      setAcceptedBookings([...acceptedBookings, booking]);
      setBookingRequests(
        bookingRequests.filter((b) => b.id !== bookingId),
      );
      toast.success("Booking request accepted!");
    }
  };

  const handleDeclineBooking = (bookingId: number) => {
    setBookingRequests(
      bookingRequests.filter((b) => b.id !== bookingId),
    );
    toast.info("Booking request declined.");
  };

  const handleAddService = () => {
    const newService = {
      id: services.length + 1,
      name: newServiceName,
      price: `₹${newServicePrice}`,
      duration: newServiceDuration,
      active: true,
      description: newServiceDescription,
    };
    setServices([...services, newService]);
    toast.success(
      `Service "${newServiceName}" added successfully!`,
    );
    setShowAddServiceDialog(false);
    setNewServiceName("");
    setNewServicePrice("");
    setNewServiceDuration("");
    setNewServiceDescription("");
  };

  const handleEditService = (service: any) => {
    setSelectedService(service);
    setShowEditServiceDialog(true);
  };

  const handleSaveEditService = () => {
    toast.success(
      `Service "${selectedService.name}" updated successfully!`,
    );
    setShowEditServiceDialog(false);
    setSelectedService(null);
  };

  const handleDeleteService = (service: any) => {
    if (
      confirm(
        `Are you sure you want to delete "${service.name}"?`,
      )
    ) {
      setServices(services.filter((s) => s.id !== service.id));
      toast.success(
        `Service "${service.name}" deleted successfully!`,
      );
    }
  };

  const handleToggleServiceStatus = (serviceId: number) => {
    setServices(
      services.map((s) =>
        s.id === serviceId ? { ...s, active: !s.active } : s,
      ),
    );
    const service = services.find((s) => s.id === serviceId);
    toast.success(
      `Service ${service?.active ? "deactivated" : "activated"} successfully!`,
    );
  };

  const BookingRequestCard = ({
    booking,
  }: {
    booking: any;
  }) => (
    <Card className="bg-white border-l-4 border-l-[#F39C12]">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="mb-1">{booking.service}</h3>
              <Badge className="bg-[#F39C12] hover:bg-[#F39C12]/90">
                New Request
              </Badge>
            </div>
            <p className="text-[#F39C12] font-semibold">
              {booking.price}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm border-b pb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Client: {booking.clientName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{booking.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{booking.phone}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm bg-[#ECF0F1] p-3 rounded-lg">
          <p className="font-semibold text-[#2C3E50] mb-2">
            MealAura Specific Details:
          </p>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Diet Type:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.dietType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Allergies:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.allergies}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Preferences:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.mealPreferences}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-[#F39C12] hover:bg-[#F39C12]/90"
            onClick={() => handleAcceptBooking(booking.id)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-destructive hover:bg-destructive/10"
            onClick={() => handleDeclineBooking(booking.id)}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const AcceptedBookingCard = ({
    booking,
  }: {
    booking: any;
  }) => (
    <Card className="bg-white border-l-4 border-l-[#F39C12]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="mb-1">{booking.service}</h3>
            <Badge className="bg-[#2ECC71] hover:bg-[#2ECC71]/90">
              Confirmed
            </Badge>
          </div>
          <p className="text-[#F39C12] font-semibold">
            {booking.price}
          </p>
        </div>

        <div className="space-y-2 mb-4 text-sm border-b pb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Client: {booking.clientName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{booking.address}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm bg-gradient-to-br from-[#F39C12]/10 to-[#F39C12]/5 p-3 rounded-lg">
          <p className="font-semibold text-[#2C3E50] mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#F39C12]" />
            Meal Plan Details:
          </p>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Diet Type:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.dietType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Allergies:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.allergies}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#F39C12]" />
            <span className="text-muted-foreground">
              Preferences:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.mealPreferences}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="mb-2">Welcome, {partnerName}!</h1>
          <p className="text-muted-foreground">
            Manage your meal planning and nutrition service
            bookings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-l-4 border-l-[#F39C12]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Pending Requests
                </p>
                <Calendar className="w-5 h-5 text-[#F39C12]" />
              </div>
              <p className="text-3xl text-[#F39C12] font-semibold">
                {bookingRequests.length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-[#2ECC71]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Confirmed Bookings
                </p>
                <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <p className="text-3xl text-[#2ECC71] font-semibold">
                {acceptedBookings.length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-[#2C3E50]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  This Month
                </p>
                <DollarSign className="w-5 h-5 text-[#2C3E50]" />
              </div>
              <p className="text-3xl text-[#2C3E50] font-semibold">
                ₹68,500
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-[#F39C12]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Rating
                </p>
                <TrendingUp className="w-5 h-5 text-[#F39C12]" />
              </div>
              <p className="text-3xl text-[#F39C12] font-semibold">
                4.7★
              </p>
            </CardContent>
          </Card>
        </div>

        <Card
          className="mb-8 text-white"
          style={{
            background:
              "linear-gradient(135deg, #F39C12 0%, #F39C12dd 100%)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm opacity-90">
                  Service Category
                </p>
                <h3 className="text-xl mb-1">
                  MealAura - Meal Planning & Nutrition Provider
                </h3>
                <p className="text-sm opacity-75">
                  Creating customized meal plans and nutrition
                  guidance for seniors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="requests">
              Requests ({bookingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="calendar">
              My Calendar ({acceptedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="services">
              My Services ({services.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-6">
            {bookingRequests.length > 0 ? (
              <div className="grid gap-6">
                {bookingRequests.map((booking) => (
                  <BookingRequestCard
                    key={booking.id}
                    booking={booking}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No Pending Requests</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! New booking requests
                    will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            {acceptedBookings.length > 0 ? (
              <div className="grid gap-6">
                {acceptedBookings.map((booking) => (
                  <AcceptedBookingCard
                    key={booking.id}
                    booking={booking}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">
                    No Confirmed Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    Accepted bookings will appear in your
                    calendar.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card className="bg-white mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Offerings</CardTitle>
                    <CardDescription>
                      Manage your meal planning and nutrition
                      services
                    </CardDescription>
                  </div>
                  <Button
                    className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                    onClick={() =>
                      setShowAddServiceDialog(true)
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {services.length > 0 ? (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className="border-2"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3>{service.name}</h3>
                                <Badge
                                  variant={
                                    service.active
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    service.active
                                      ? "bg-[#F39C12]"
                                      : ""
                                  }
                                >
                                  {service.active
                                    ? "Active"
                                    : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {service.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-[#F39C12] font-semibold">
                                  {service.price}
                                </span>
                                <span className="text-muted-foreground">
                                  • {service.duration}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleToggleServiceStatus(
                                    service.id,
                                  )
                                }
                              >
                                {service.active
                                  ? "Deactivate"
                                  : "Activate"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#F39C12]"
                                onClick={() =>
                                  handleEditService(service)
                                }
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteService(service)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <UtensilsCrossed className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="mb-2">No Services Added</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your first meal planning service to
                      start receiving bookings
                    </p>
                    <Button
                      className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                      onClick={() =>
                        setShowAddServiceDialog(true)
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Service
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#ECF0F1] to-white">
              <CardHeader>
                <CardTitle>
                  Suggested Services for MealAura
                </CardTitle>
                <CardDescription>
                  Popular meal planning and nutrition services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {serviceExamples.map((example, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-lg border-2 border-dashed border-gray-300 text-sm text-center text-muted-foreground hover:border-[#F39C12] hover:text-[#F39C12] transition-colors cursor-pointer"
                      onClick={() => {
                        setNewServiceName(example);
                        setShowAddServiceDialog(true);
                      }}
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Service Dialog */}
      <Dialog
        open={showAddServiceDialog}
        onOpenChange={setShowAddServiceDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new meal planning or nutrition service
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">
                Service Name *
              </Label>
              <Input
                id="service-name"
                placeholder="e.g., Weekly Meal Plan"
                value={newServiceName}
                onChange={(e) =>
                  setNewServiceName(e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-price">
                  Price (₹) *
                </Label>
                <Input
                  id="service-price"
                  placeholder="e.g., 5000"
                  value={newServicePrice}
                  onChange={(e) =>
                    setNewServicePrice(e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-duration">
                  Duration *
                </Label>
                <Input
                  id="service-duration"
                  placeholder="e.g., 7 days"
                  value={newServiceDuration}
                  onChange={(e) =>
                    setNewServiceDuration(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-description">
                Description
              </Label>
              <Textarea
                id="service-description"
                placeholder="Describe what's included in this service..."
                value={newServiceDescription}
                onChange={(e) =>
                  setNewServiceDescription(e.target.value)
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddServiceDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#F39C12] hover:bg-[#F39C12]/90"
              onClick={handleAddService}
              disabled={
                !newServiceName ||
                !newServicePrice ||
                !newServiceDuration
              }
            >
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog
        open={showEditServiceDialog}
        onOpenChange={setShowEditServiceDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update your service details and pricing
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-service-name">
                Service Name
              </Label>
              <Input
                id="edit-service-name"
                defaultValue={selectedService?.name}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-service-price">
                  Price
                </Label>
                <Input
                  id="edit-service-price"
                  defaultValue={selectedService?.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-service-duration">
                  Duration
                </Label>
                <Input
                  id="edit-service-duration"
                  defaultValue={selectedService?.duration}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-service-description">
                Description
              </Label>
              <Textarea
                id="edit-service-description"
                defaultValue={selectedService?.description}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-service-status">
                Status
              </Label>
              <Select
                defaultValue={
                  selectedService?.active
                    ? "active"
                    : "inactive"
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditServiceDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#F39C12] hover:bg-[#F39C12]/90"
              onClick={handleSaveEditService}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}