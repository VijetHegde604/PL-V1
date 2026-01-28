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
  Stethoscope,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  FileText,
  Upload,
} from "lucide-react";

interface NutriScanPartnerDashboardProps {
  partnerName: string;
}

const mockServices = [
  {
    id: 1,
    name: "Full Body Checkup",
    price: "₹3,999",
    duration: "2-3 hours",
    active: true,
    description:
      "Comprehensive health screening with detailed report",
  },
  {
    id: 2,
    name: "Blood Test Package",
    price: "₹1,200",
    duration: "30 minutes",
    active: true,
    description: "Complete blood count and lipid profile",
  },
  {
    id: 3,
    name: "ECG Test",
    price: "₹500",
    duration: "15 minutes",
    active: true,
    description: "Electrocardiogram with expert analysis",
  },
];

const mockBookingRequests = [
  {
    id: 1,
    service: "Full Body Checkup",
    clientName: "Suresh Patel",
    date: "2025-11-10",
    time: "8:00 AM",
    address: "C-789, Vasant Vihar, Delhi",
    phone: "+91 9876543212",
    price: "₹3,999",
    testPackage: "Full Body Checkup with Blood Work",
    labTime: "Morning (8-10 AM)",
    requirements: "Fasting required (12 hours)",
  },
  {
    id: 2,
    service: "Blood Test Package",
    clientName: "Anita Verma",
    date: "2025-11-11",
    time: "9:30 AM",
    address: "D-101, Hauz Khas, Delhi",
    phone: "+91 9876543213",
    price: "₹1,200",
    testPackage: "Complete Blood Count + Lipid Profile",
    labTime: "Morning (9-11 AM)",
    requirements: "8-hour fasting preferred",
  },
];

const mockAcceptedBookings = [
  {
    id: 3,
    service: "ECG Test",
    clientName: "Vikram Rao",
    date: "2025-11-07",
    time: "10:00 AM",
    address: "N-222, Mayur Vihar, Delhi",
    price: "₹500",
    testPackage: "Electrocardiogram",
    labTime: "Mid-morning (10 AM)",
    requirements: "No special preparation needed",
  },
];

const serviceExamples = [
  "Diabetes Screening",
  "Thyroid Function Test",
  "Liver Function Test",
  "Kidney Function Test",
  "Bone Density Scan",
  "Chest X-Ray",
];

export function NutriScanPartnerDashboard({
  partnerName,
}: NutriScanPartnerDashboardProps) {
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
  const [showUploadReportDialog, setShowUploadReportDialog] =
    useState(false);
  const [
    selectedBookingForReport,
    setSelectedBookingForReport,
  ] = useState<any>(null);

  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] =
    useState("");
  const [newServiceDescription, setNewServiceDescription] =
    useState("");

  const [reportName, setReportName] = useState("");
  const [reportDoctorName, setReportDoctorName] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportNotes, setReportNotes] = useState("");

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

  const handleUploadReport = (booking: any) => {
    setSelectedBookingForReport(booking);
    setShowUploadReportDialog(true);
  };

  const handleSubmitReport = () => {
    toast.success(
      `Report uploaded successfully for ${selectedBookingForReport?.clientName}!`,
    );
    setShowUploadReportDialog(false);
    setReportName("");
    setReportDoctorName("");
    setReportType("");
    setReportNotes("");
    setSelectedBookingForReport(null);
  };

  const BookingRequestCard = ({
    booking,
  }: {
    booking: any;
  }) => (
    <Card className="bg-white border-l-4 border-l-[#2ECC71]">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="mb-1">{booking.service}</h3>
              <Badge className="bg-[#F39C12] hover:bg-[#F39C12]/90">
                New Request
              </Badge>
            </div>
            <p className="text-[#2ECC71] font-semibold">
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
            NutriScan Specific Details:
          </p>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Test Package:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.testPackage}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Preferred Lab Time:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.labTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Special Requirements:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.requirements}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-[#2ECC71] hover:bg-[#2ECC71]/90"
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
    <Card className="bg-white border-l-4 border-l-[#2ECC71]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="mb-1">{booking.service}</h3>
            <Badge className="bg-[#2ECC71] hover:bg-[#2ECC71]/90">
              Confirmed
            </Badge>
          </div>
          <p className="text-[#2ECC71] font-semibold">
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

        <div className="space-y-2 mb-4 text-sm bg-gradient-to-br from-[#2ECC71]/10 to-[#2ECC71]/5 p-3 rounded-lg">
          <p className="font-semibold text-[#2C3E50] mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#2ECC71]" />
            Test Details:
          </p>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Test Package:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.testPackage}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Preferred Lab Time:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.labTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-muted-foreground">
              Special Requirements:
            </span>
            <span className="font-medium text-[#2C3E50]">
              {booking.requirements}
            </span>
          </div>
        </div>

        <Button
          className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
          onClick={() => handleUploadReport(booking)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="mb-2">Welcome, {partnerName}!</h1>
          <p className="text-muted-foreground">
            Manage your health checkup and diagnostic service
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
                ₹52,400
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-[#2ECC71]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Rating
                </p>
                <TrendingUp className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <p className="text-3xl text-[#2ECC71] font-semibold">
                4.9★
              </p>
            </CardContent>
          </Card>
        </div>

        <Card
          className="mb-8 text-white"
          style={{
            background:
              "linear-gradient(135deg, #2ECC71 0%, #2ECC71dd 100%)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm opacity-90">
                  Service Category
                </p>
                <h3 className="text-xl mb-1">
                  NutriScan - Health Checkup & Diagnostics
                  Provider
                </h3>
                <p className="text-sm opacity-75">
                  Offering comprehensive health checkups and
                  diagnostic services
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
                      Manage your health checkup and diagnostic
                      services
                    </CardDescription>
                  </div>
                  <Button
                    className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
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
                                      ? "bg-[#2ECC71]"
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
                                <span className="text-[#2ECC71] font-semibold">
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
                                className="text-[#2ECC71]"
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
                    <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="mb-2">No Services Added</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your first diagnostic service to start
                      receiving bookings
                    </p>
                    <Button
                      className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
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
                  Suggested Services for NutriScan
                </CardTitle>
                <CardDescription>
                  Popular health checkup and diagnostic services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {serviceExamples.map((example, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-lg border-2 border-dashed border-gray-300 text-sm text-center text-muted-foreground hover:border-[#2ECC71] hover:text-[#2ECC71] transition-colors cursor-pointer"
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
              Create a new health checkup or diagnostic service
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">
                Service Name *
              </Label>
              <Input
                id="service-name"
                placeholder="e.g., Full Body Checkup"
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
                  placeholder="e.g., 3999"
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
                  placeholder="e.g., 2-3 hours"
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
              className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
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
              className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
              onClick={handleSaveEditService}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Report Dialog */}
      <Dialog
        open={showUploadReportDialog}
        onOpenChange={setShowUploadReportDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Upload Report for{" "}
              {selectedBookingForReport?.clientName}
            </DialogTitle>
            <DialogDescription>
              Service: {selectedBookingForReport?.service} •
              Date: {selectedBookingForReport?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name *</Label>
              <Input
                id="report-name"
                placeholder="e.g., Full Body Checkup Report"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-doctor-name">
                Doctor's Name *
              </Label>
              <Input
                id="report-doctor-name"
                placeholder="e.g., Dr. John Doe"
                value={reportDoctorName}
                onChange={(e) =>
                  setReportDoctorName(e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type *</Label>
              <Select
                value={reportType}
                onValueChange={setReportType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blood Test">
                    Blood Test
                  </SelectItem>
                  <SelectItem value="Cardiac">
                    Cardiac
                  </SelectItem>
                  <SelectItem value="Radiology">
                    Radiology
                  </SelectItem>
                  <SelectItem value="General">
                    General
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-notes">Notes</Label>
              <Textarea
                id="report-notes"
                placeholder="Add any additional notes..."
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-file">Upload File</Label>
              <Input
                id="report-file"
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUploadReportDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
              onClick={handleSubmitReport}
              disabled={
                !reportName || !reportDoctorName || !reportType
              }
            >
              Upload Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}