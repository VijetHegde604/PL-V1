import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
  Users, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Settings,
  PartyPopper,
  Plus
} from "lucide-react";
import { EVENT_IMAGES } from "../constants/images";

interface AdminDashboardProps {
  onBack: () => void;
  onLogout?: () => void;
}

// Mock data for admin dashboard
const mockUsers = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", role: "Parent", status: "Active", joinDate: "2025-10-15" },
  { id: 2, name: "Meera Sharma", email: "meera@example.com", role: "Parent", status: "Active", joinDate: "2025-10-20" },
  { id: 3, name: "Dr. Anita Verma", email: "anita@example.com", role: "Partner", status: "Active", joinDate: "2025-10-12" },
  { id: 4, name: "Yoga Studio Plus", email: "yoga@example.com", role: "Partner", status: "Pending", joinDate: "2025-11-05" },
  { id: 5, name: "Suresh Patel", email: "suresh@example.com", role: "Parent", status: "Active", joinDate: "2025-11-01" },
];

const mockBookings = [
  { id: 1, service: "Yoga Session", client: "Rajesh Kumar", partner: "Yoga Studio Plus", date: "2025-11-12", status: "Confirmed", amount: "₹800" },
  { id: 2, service: "Full Body Checkup", client: "Meera Sharma", partner: "Dr. Anita Verma", date: "2025-11-15", status: "Pending", amount: "₹3,999" },
  { id: 3, service: "Home Nursing", client: "Suresh Patel", partner: "CareNest Services", date: "2025-11-08", status: "Completed", amount: "₹2,500" },
  { id: 4, service: "Physiotherapy", client: "Rajesh Kumar", partner: "RejuvaFit Clinic", date: "2025-11-10", status: "Confirmed", amount: "₹1,200" },
  { id: 5, service: "Meal Planning", client: "Meera Sharma", partner: "MealAura Chef", date: "2025-11-14", status: "Pending", amount: "₹1,500" },
];

const mockServices = [
  { id: 1, name: "Yoga Session (Single)", module: "RejuvaFit", price: "₹800", active: true },
  { id: 2, name: "Full Body Checkup", module: "NutriScan", price: "₹3,999", active: true },
  { id: 3, name: "Home Nursing (8 hours)", module: "CareNest", price: "₹2,500", active: true },
  { id: 4, name: "Weekly Meal Plan", module: "MealAura", price: "₹1,500", active: true },
  { id: 5, name: "Spa & Massage", module: "BlissTouch", price: "₹1,800", active: false },
];

const initialEvents = [
  {
    id: 1,
    name: 'Musical Evening with Classical Legends',
    date: '2025-11-15',
    time: '6:00 PM',
    location: 'Community Center, Sector 12',
    attendees: 45,
    maxAttendees: 60,
    category: 'Music',
    description: 'An evening of classical music performances',
    status: 'active',
    imageUrl: EVENT_IMAGES.MUSIC
  },
  {
    id: 2,
    name: 'Art & Craft Workshop',
    date: '2025-11-18',
    time: '3:00 PM',
    location: 'Creative Studio, Downtown',
    attendees: 28,
    maxAttendees: 30,
    category: 'Art',
    description: 'Learn pottery and painting techniques',
    status: 'active',
    imageUrl: EVENT_IMAGES.ART
  },
  {
    id: 3,
    name: 'Book Club: Monthly Discussion',
    date: '2025-11-20',
    time: '4:00 PM',
    location: 'Library Hall, City Center',
    attendees: 22,
    maxAttendees: 40,
    category: 'Literature',
    description: 'Discussion on latest bestseller',
    status: 'active',
    imageUrl: EVENT_IMAGES.LITERATURE
  },
  {
    id: 4,
    name: 'Gardening Club Meet',
    date: '2025-11-25',
    time: '10:00 AM',
    location: 'Botanical Garden',
    attendees: 35,
    maxAttendees: 50,
    category: 'Gardening',
    description: 'Seasonal planting workshop',
    status: 'active',
    imageUrl: EVENT_IMAGES.GARDENING
  },
];

export function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showAddServiceDialog, setShowAddServiceDialog] = useState(false);
  const [showEditServiceDialog, setShowEditServiceDialog] = useState(false);
  const [showEditBookingDialog, setShowEditBookingDialog] = useState(false);
  const [showAddBookingDialog, setShowAddBookingDialog] = useState(false);
  const [showServiceSettingsDialog, setShowServiceSettingsDialog] = useState(false);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showEditEventDialog, setShowEditEventDialog] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // State management for all data
  const [users, setUsers] = useState(mockUsers);
  const [services, setServices] = useState(mockServices);
  const [bookings, setBookings] = useState(mockBookings);
  const [events, setEvents] = useState(initialEvents);

  // Form states for Add User
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Parent");
  
  // Form states for Add Service
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceModule, setNewServiceModule] = useState("CareNest");
  const [newServicePrice, setNewServicePrice] = useState("");
  
  // Form states for Add Booking
  const [newBookingParent, setNewBookingParent] = useState("");
  const [newBookingService, setNewBookingService] = useState("");
  const [newBookingModule, setNewBookingModule] = useState("CareNest");
  const [newBookingDate, setNewBookingDate] = useState("");
  const [newBookingTime, setNewBookingTime] = useState("");
  const [newBookingPartner, setNewBookingPartner] = useState("");
  
  // Form states for Add Event
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("Music");
  const [newEventMaxAttendees, setNewEventMaxAttendees] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventImageUrl, setNewEventImageUrl] = useState("");

  // Handlers
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    toast.success(`User "${newUserName}" added successfully!`);
    setShowAddUserDialog(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("Parent");
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setNewUserName(user.name);
    setNewUserEmail(user.email);
    setNewUserRole(user.role);
    setShowEditUserDialog(true);
  };

  const handleSaveEditUser = () => {
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: newUserName,
          email: newUserEmail,
          role: newUserRole
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    toast.success(`User "${newUserName}" updated successfully!`);
    setShowEditUserDialog(false);
    setSelectedUser(null);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("Parent");
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      const updatedUsers = users.filter(u => u.id !== user.id);
      setUsers(updatedUsers);
      toast.success(`User "${user.name}" deleted successfully!`);
    }
  };

  const handleAddService = () => {
    const newService = {
      id: services.length + 1,
      name: newServiceName,
      module: newServiceModule,
      price: `₹${newServicePrice}`,
      active: true
    };
    setServices([...services, newService]);
    toast.success(`Service "${newServiceName}" added successfully!`);
    setShowAddServiceDialog(false);
    setNewServiceName("");
    setNewServiceModule("CareNest");
    setNewServicePrice("");
  };

  const handleEditService = (service: any) => {
    setSelectedService(service);
    setNewServiceName(service.name);
    setNewServiceModule(service.module);
    setNewServicePrice(service.price.replace('₹', ''));
    setShowEditServiceDialog(true);
  };

  const handleSaveEditService = () => {
    const updatedServices = services.map(service => {
      if (service.id === selectedService.id) {
        return {
          ...service,
          name: newServiceName,
          module: newServiceModule,
          price: `₹${newServicePrice}`
        };
      }
      return service;
    });
    setServices(updatedServices);
    toast.success(`Service "${newServiceName}" updated successfully!`);
    setShowEditServiceDialog(false);
    setSelectedService(null);
    setNewServiceName("");
    setNewServiceModule("CareNest");
    setNewServicePrice("");
  };

  const handleDeleteService = (service: any) => {
    if (confirm(`Are you sure you want to delete ${service.name}?`)) {
      const updatedServices = services.filter(s => s.id !== service.id);
      setServices(updatedServices);
      toast.success(`Service "${service.name}" deleted successfully!`);
    }
  };

  const handleServiceSettings = (service: any) => {
    setSelectedService(service);
    setShowServiceSettingsDialog(true);
  };

  const handleAddBooking = () => {
    const newBooking = {
      id: bookings.length + 1,
      service: newBookingService,
      client: newBookingParent,
      partner: newBookingPartner,
      date: newBookingDate,
      status: "Pending",
      amount: services.find(s => s.name === newBookingService)?.price || "₹0"
    };
    setBookings([...bookings, newBooking]);
    toast.success(`Booking created successfully for ${newBookingParent}!`);
    setShowAddBookingDialog(false);
    setNewBookingParent("");
    setNewBookingService("");
    setNewBookingModule("CareNest");
    setNewBookingDate("");
    setNewBookingTime("");
    setNewBookingPartner("");
  };

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowEditBookingDialog(true);
  };

  const handleSaveEditBooking = () => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking.id) {
        return {
          ...selectedBooking
        };
      }
      return booking;
    });
    setBookings(updatedBookings);
    toast.success(`Booking #${selectedBooking?.id} updated successfully!`);
    setShowEditBookingDialog(false);
    setSelectedBooking(null);
  };

  const handleApproveBooking = (booking: any) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === booking.id) {
        return { ...b, status: "Confirmed" };
      }
      return b;
    });
    setBookings(updatedBookings);
    toast.success(`Booking #${booking.id} approved successfully!`);
  };

  const handleRejectBooking = (booking: any) => {
    if (confirm(`Are you sure you want to reject booking #${booking.id}?`)) {
      const updatedBookings = bookings.map(b => {
        if (b.id === booking.id) {
          return { ...b, status: "Cancelled" };
        }
        return b;
      });
      setBookings(updatedBookings);
      toast.error(`Booking #${booking.id} rejected`);
    }
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      name: newEventName,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      attendees: 0,
      maxAttendees: parseInt(newEventMaxAttendees, 10),
      category: newEventCategory,
      description: newEventDescription,
      status: 'active',
      imageUrl: newEventImageUrl
    };
    setEvents([...events, newEvent]);
    toast.success(`Event "${newEventName}" added successfully!`);
    setShowAddEventDialog(false);
    setNewEventName("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventLocation("");
    setNewEventCategory("Music");
    setNewEventMaxAttendees("");
    setNewEventDescription("");
    setNewEventImageUrl("");
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    // Pre-populate form fields with selected event data
    setNewEventName(event.name);
    setNewEventDate(event.date);
    setNewEventTime(event.time);
    setNewEventLocation(event.location);
    setNewEventCategory(event.category);
    setNewEventMaxAttendees(event.maxAttendees.toString());
    setNewEventDescription(event.description);
    setNewEventImageUrl(event.imageUrl || "");
    setShowEditEventDialog(true);
  };

  const handleSaveEditEvent = () => {
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          name: newEventName,
          date: newEventDate,
          time: newEventTime,
          location: newEventLocation,
          maxAttendees: parseInt(newEventMaxAttendees, 10),
          category: newEventCategory,
          description: newEventDescription,
          imageUrl: newEventImageUrl
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    toast.success(`Event "${newEventName}" updated successfully!`);
    setShowEditEventDialog(false);
    setSelectedEvent(null);
    // Clear form fields
    setNewEventName("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventLocation("");
    setNewEventCategory("Music");
    setNewEventMaxAttendees("");
    setNewEventDescription("");
    setNewEventImageUrl("");
  };

  const handleDeleteEvent = (event: any) => {
    if (confirm(`Are you sure you want to delete ${event.name}?`)) {
      const updatedEvents = events.filter(e => e.id !== event.id);
      setEvents(updatedEvents);
      toast.success(`Event ${event.name} deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF0F1]">
      {/* Django-style Header */}
      <div className="bg-[#417690] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-[#F39C12]" fill="#F39C12" />
              <div>
                <h1 className="text-2xl">Parents Luxuria Administration</h1>
                <p className="text-sm text-white/80">Platform Management Dashboard</p>
              </div>
            </div>
            <Button 
              className="bg-[#F39C12] hover:bg-[#F39C12]/90"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span 
              className="text-[#417690] cursor-pointer hover:underline"
              onClick={onBack}
            >
              Home
            </span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#2ECC71]">
            <CardHeader className="pb-3">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">247</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-[#2ECC71]">
                <TrendingUp className="w-4 h-4" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#F39C12]">
            <CardHeader className="pb-3">
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-3xl">1,429</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-[#F39C12]">
                <Calendar className="w-4 h-4" />
                <span>148 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#2C3E50]">
            <CardHeader className="pb-3">
              <CardDescription>Active Partners</CardDescription>
              <CardTitle className="text-3xl">89</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-[#2C3E50]">
                <Users className="w-4 h-4" />
                <span>4 pending approval</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#2ECC71]">
            <CardHeader className="pb-3">
              <CardDescription>Revenue (This Month)</CardDescription>
              <CardTitle className="text-3xl">₹2.4L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-[#2ECC71]">
                <TrendingUp className="w-4 h-4" />
                <span>+18% growth</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="services">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="events">
              <PartyPopper className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and service partners</CardDescription>
                  </div>
                  <Button 
                    className="bg-[#417690] hover:bg-[#417690]/90"
                    onClick={() => setShowAddUserDialog(true)}
                  >
                    + Add User
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f9fa]">
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-[#f8f9fa]">
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Partner" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === "Active" ? "default" : "outline"}
                            className={user.status === "Active" ? "bg-[#2ECC71]" : ""}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#417690]"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Booking Management</CardTitle>
                    <CardDescription>View and manage all platform bookings</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
                      onClick={() => setShowAddBookingDialog(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Booking
                    </Button>
                    <Badge variant="outline">Total: 1,429</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f9fa]">
                      <TableHead>ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-[#f8f9fa]">
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.client}</TableCell>
                        <TableCell className="text-muted-foreground">{booking.partner}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              booking.status === "Completed" ? "default" : 
                              booking.status === "Confirmed" ? "secondary" : 
                              "outline"
                            }
                            className={
                              booking.status === "Completed" ? "bg-[#2ECC71]" : 
                              booking.status === "Confirmed" ? "bg-[#2C3E50]" : 
                              ""
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#417690]"
                              onClick={() => handleEditBooking(booking)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {booking.status === "Pending" && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-[#2ECC71]"
                                  onClick={() => handleApproveBooking(booking)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600"
                                  onClick={() => handleRejectBooking(booking)}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Management</CardTitle>
                    <CardDescription>Manage available services and pricing</CardDescription>
                  </div>
                  <Button 
                    className="bg-[#417690] hover:bg-[#417690]/90"
                    onClick={() => setShowAddServiceDialog(true)}
                  >
                    + Add Service
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search services..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f9fa]">
                      <TableHead>ID</TableHead>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id} className="hover:bg-[#f8f9fa]">
                        <TableCell>{service.id}</TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.module}</Badge>
                        </TableCell>
                        <TableCell>{service.price}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={service.active ? "default" : "outline"}
                            className={service.active ? "bg-[#2ECC71]" : ""}
                          >
                            {service.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#417690]"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#2C3E50]"
                              onClick={() => handleServiceSettings(service)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>Manage community events and activities</CardDescription>
                  </div>
                  <Button 
                    className="bg-[#417690] hover:bg-[#417690]/90"
                    onClick={() => setShowAddEventDialog(true)}
                  >
                    + Add Event
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f9fa]">
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Max Attendees</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id} className="hover:bg-[#f8f9fa]">
                        <TableCell>{event.id}</TableCell>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell className="text-muted-foreground">{event.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{event.category}</Badge>
                        </TableCell>
                        <TableCell>{event.maxAttendees}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#417690]"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleDeleteEvent(event)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Full Name</Label>
              <Input
                id="user-name"
                placeholder="Enter full name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="user@example.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role">Role</Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-user-name">Full Name</Label>
              <Input
                id="edit-user-name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-user-email">Email</Label>
              <Input
                id="edit-user-email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-user-role">Role</Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUserDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleSaveEditUser}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={showAddServiceDialog} onOpenChange={setShowAddServiceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service offering for the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                placeholder="e.g., Full Body Checkup"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-module">Module</Label>
              <Select value={newServiceModule} onValueChange={setNewServiceModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CareNest">CareNest (Home Nursing)</SelectItem>
                  <SelectItem value="NutriScan">NutriScan (Health Checkup)</SelectItem>
                  <SelectItem value="MealAura">MealAura (Meal Planning)</SelectItem>
                  <SelectItem value="RejuvaFit">RejuvaFit (Fitness)</SelectItem>
                  <SelectItem value="BlissTouch">BlissTouch (Grooming)</SelectItem>
                  <SelectItem value="SilverCircle">SilverCircle (Community)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-price">Price (₹)</Label>
              <Input
                id="service-price"
                placeholder="e.g., 3999"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddServiceDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleAddService}
            >
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={showEditServiceDialog} onOpenChange={setShowEditServiceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service details and pricing
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-service-name">Service Name</Label>
              <Input
                id="edit-service-name"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-service-module">Module</Label>
              <Select value={newServiceModule} onValueChange={setNewServiceModule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CareNest">CareNest (Home Nursing)</SelectItem>
                  <SelectItem value="NutriScan">NutriScan (Health Checkup)</SelectItem>
                  <SelectItem value="MealAura">MealAura (Meal Planning)</SelectItem>
                  <SelectItem value="RejuvaFit">RejuvaFit (Fitness)</SelectItem>
                  <SelectItem value="BlissTouch">BlissTouch (Grooming)</SelectItem>
                  <SelectItem value="SilverCircle">SilverCircle (Community)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-service-price">Price (₹)</Label>
              <Input
                id="edit-service-price"
                placeholder="e.g., 3999"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditServiceDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleSaveEditService}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Settings Dialog */}
      <Dialog open={showServiceSettingsDialog} onOpenChange={setShowServiceSettingsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Service Settings</DialogTitle>
            <DialogDescription>
              Configure advanced settings for {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select defaultValue="always">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always Available</SelectItem>
                  <SelectItem value="weekdays">Weekdays Only</SelectItem>
                  <SelectItem value="weekends">Weekends Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Maximum Bookings Per Day</Label>
              <Input type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label>Advance Booking (Days)</Label>
              <Input type="number" defaultValue="7" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowServiceSettingsDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={() => {
                toast.success('Settings updated successfully!');
                setShowServiceSettingsDialog(false);
              }}
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={showEditBookingDialog} onOpenChange={setShowEditBookingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking details and status
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Service</Label>
              <Input defaultValue={selectedBooking?.service} />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" defaultValue={selectedBooking?.date} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={selectedBooking?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input defaultValue={selectedBooking?.amount} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditBookingDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleSaveEditBooking}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Booking Dialog */}
      <Dialog open={showAddBookingDialog} onOpenChange={setShowAddBookingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Booking</DialogTitle>
            <DialogDescription>
              Create a new service booking for a parent/senior
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="booking-parent">Parent/Client Name *</Label>
              <Select value={newBookingParent} onValueChange={setNewBookingParent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.role === "Parent").map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-module">Service Module *</Label>
              <Select value={newBookingModule} onValueChange={(value) => {
                setNewBookingModule(value);
                setNewBookingService("");
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CareNest">CareNest - Home Nursing</SelectItem>
                  <SelectItem value="NutriScan">NutriScan - Health Checkups</SelectItem>
                  <SelectItem value="MealAura">MealAura - Meal Planning</SelectItem>
                  <SelectItem value="RejuvaFit">RejuvaFit - Fitness & Wellness</SelectItem>
                  <SelectItem value="BlissTouch">BlissTouch - Spa & Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-service">Service *</Label>
              <Select value={newBookingService} onValueChange={setNewBookingService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services
                    .filter(s => s.module === newBookingModule)
                    .map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} - {service.price}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-date">Date *</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={newBookingDate}
                  onChange={(e) => setNewBookingDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-time">Time *</Label>
                <Input
                  id="booking-time"
                  type="time"
                  value={newBookingTime}
                  onChange={(e) => setNewBookingTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-partner">Partner/Provider *</Label>
              <Select value={newBookingPartner} onValueChange={setNewBookingPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.role === "Partner").map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBookingDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#2ECC71] hover:bg-[#2ECC71]/90"
              onClick={handleAddBooking}
              disabled={!newBookingParent || !newBookingService || !newBookingDate || !newBookingTime || !newBookingPartner}
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new SilverCircle community event
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                placeholder="e.g., Musical Evening"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  placeholder="e.g., 6:00 PM"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                placeholder="e.g., Community Center, Sector 12"
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="event-category">Category</Label>
                <Select value={newEventCategory} onValueChange={setNewEventCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Gardening">Gardening</SelectItem>
                    <SelectItem value="Dance">Dance</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-max-attendees">Max Attendees</Label>
                <Input
                  id="event-max-attendees"
                  type="number"
                  placeholder="e.g., 50"
                  value={newEventMaxAttendees}
                  onChange={(e) => setNewEventMaxAttendees(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                placeholder="e.g., An evening of classical music performances"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-image-url">Image URL</Label>
              <Input
                id="event-image-url"
                placeholder="https://images.unsplash.com/photo-..."
                value={newEventImageUrl}
                onChange={(e) => setNewEventImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste an image URL from Unsplash or other source
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleAddEvent}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditEventDialog} onOpenChange={setShowEditEventDialog}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update SilverCircle event details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-event-name">Event Name</Label>
              <Input
                id="edit-event-name"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-event-date">Date</Label>
                <Input
                  id="edit-event-date"
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-event-time">Time</Label>
                <Input
                  id="edit-event-time"
                  placeholder="e.g., 6:00 PM"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-event-location">Location</Label>
              <Input
                id="edit-event-location"
                placeholder="e.g., Community Center, Sector 12"
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-event-category">Category</Label>
                <Select value={newEventCategory} onValueChange={setNewEventCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Gardening">Gardening</SelectItem>
                    <SelectItem value="Dance">Dance</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-event-max-attendees">Max Attendees</Label>
                <Input
                  id="edit-event-max-attendees"
                  type="number"
                  value={newEventMaxAttendees}
                  onChange={(e) => setNewEventMaxAttendees(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-event-description">Description</Label>
              <Textarea
                id="edit-event-description"
                placeholder="e.g., An evening of classical music performances"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-event-image-url">Image URL</Label>
              <Input
                id="edit-event-image-url"
                placeholder="https://images.unsplash.com/photo-..."
                value={newEventImageUrl}
                onChange={(e) => setNewEventImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste an image URL from Unsplash or other source
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditEventDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#417690] hover:bg-[#417690]/90"
              onClick={handleSaveEditEvent}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}