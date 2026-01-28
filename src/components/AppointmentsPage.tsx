import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface AppointmentsPageProps {
  appointments: any[];
  onBack: () => void;
}

export function AppointmentsPage({
  appointments,
  onBack,
}: AppointmentsPageProps) {
  const [showRescheduleDialog, setShowRescheduleDialog] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<any>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming",
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed",
  );

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowRescheduleDialog(true);
  };

  const handleConfirmReschedule = () => {
    toast.success("Appointment rescheduled successfully!");
    setShowRescheduleDialog(false);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  const handleCancel = (appointment: any) => {
    if (
      confirm(
        `Are you sure you want to cancel the appointment for ${appointment.service}?`,
      )
    ) {
      toast.info("Appointment cancelled successfully");
    }
  };

  const AppointmentCard = ({
    appointment,
  }: {
    appointment: any;
  }) => {
    const getModuleColor = (module: string) => {
      const colors: Record<string, string> = {
        CareNest: "bg-[#2C3E50]",
        NutriScan: "bg-[#2ECC71]",
        MealAura: "bg-[#F39C12]",
        RejuvaFit: "bg-[#2C3E50]",
        BlissTouch: "bg-[#2ECC71]",
      };
      return colors[module] || "bg-[#2C3E50]";
    };

    return (
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3>{appointment.service}</h3>
              </div>
              {appointment.module && (
                <Badge
                  className={`${getModuleColor(appointment.module)} hover:${getModuleColor(appointment.module)}/90 mb-2`}
                >
                  {appointment.module}
                </Badge>
              )}
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(
                    appointment.date,
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {appointment.time}
                </span>
                {appointment.partner && (
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {appointment.partner}
                  </span>
                )}
              </div>
              <p className="text-[#F39C12] font-semibold mt-3">
                {appointment.price}
              </p>
            </div>
            <Badge
              className={`${
                appointment.status === "upcoming"
                  ? "bg-[#2ECC71] hover:bg-[#2ECC71]/90"
                  : "bg-gray-500 hover:bg-gray-500/90"
              } text-white`}
            >
              {appointment.status === "upcoming"
                ? "Upcoming"
                : "Completed"}
            </Badge>
          </div>
          {appointment.status === "upcoming" && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReschedule(appointment)}
              >
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => handleCancel(appointment)}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="mb-8">My Appointments</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="upcoming"
            className="space-y-4 mt-6"
          >
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  appointment={appointment}
                />
              ))
            ) : (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">
                    No Upcoming Appointments
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any upcoming appointments
                    scheduled.
                  </p>
                  <Button
                    className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                    onClick={onBack}
                  >
                    Book a Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  appointment={appointment}
                />
              ))
            ) : (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No Past Appointments</h3>
                  <p className="text-muted-foreground">
                    Your completed appointments will appear
                    here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your
              appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={rescheduleDate}
                onChange={(e) =>
                  setRescheduleDate(e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                className="col-span-3"
                value={rescheduleTime}
                onChange={(e) =>
                  setRescheduleTime(e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRescheduleDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmReschedule}
            >
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}