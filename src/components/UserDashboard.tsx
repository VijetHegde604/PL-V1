import {
  Stethoscope,
  Users,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface UserDashboardProps {
  userName: string;
  onServiceClick: (service: string) => void;
  onNavigate: (page: string) => void;
  appointments: any[];
}

export function UserDashboard({
  userName,
  onServiceClick,
  onNavigate,
  appointments,
}: UserDashboardProps) {
  const upcomingAppointments = appointments
    .filter((apt) => apt.status === "upcoming")
    .slice(0, 3);

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">
            Choose a service to book or manage your appointments
          </p>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <Card className="mb-12 bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Button
                variant="outline"
                onClick={() => onNavigate("appointments")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map(
                  (appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-[#F39C12] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#2ECC71]/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[#2ECC71]" />
                        </div>
                        <div>
                          <p>{appointment.service}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90">
                        {appointment.status}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-all bg-white"
            onClick={() => onNavigate("appointments")}
          >
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-[#2C3E50] mx-auto mb-3" />
              <h3 className="mb-2">My Appointments</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your bookings
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all bg-white"
            onClick={() => onNavigate("reports")}
          >
            <CardContent className="p-6 text-center">
              <Stethoscope className="w-12 h-12 text-[#2C3E50] mx-auto mb-3" />
              <h3 className="mb-2">Health Reports</h3>
              <p className="text-sm text-muted-foreground">
                Access your medical reports
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all bg-white"
            onClick={() => onNavigate("events")}
          >
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-[#2C3E50] mx-auto mb-3" />
              <h3 className="mb-2">SilverCircle Events</h3>
              <p className="text-sm text-muted-foreground">
                Join community activities
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}