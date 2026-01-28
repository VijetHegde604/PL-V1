import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  CheckCircle,
  Calendar,
  Clock,
  Home,
} from "lucide-react";

interface BookingSuccessPageProps {
  booking: any;
  onNavigate: (page: string) => void;
}

export function BookingSuccessPage({
  booking,
  onNavigate,
}: BookingSuccessPageProps) {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <Card className="bg-white">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#2ECC71] mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your appointment has been successfully booked.
              We'll send you a confirmation shortly.
            </p>

            <div className="bg-[#ECF0F1] rounded-lg p-6 mb-8 text-left">
              <h3 className="mb-4 text-center">
                Booking Details
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-muted-foreground">
                    Service
                  </span>
                  <span>{booking.service}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </span>
                  <span>{booking.date}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </span>
                  <span>{booking.time}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-muted-foreground">
                    Amount Paid
                  </span>
                  <span className="text-[#F39C12]">
                    {booking.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={() => onNavigate("dashboard")}
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onNavigate("appointments")}
              >
                View My Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}