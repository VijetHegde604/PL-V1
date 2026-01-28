import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface BookingFlowProps {
  service: any;
  onBack: () => void;
  onComplete: (booking: any) => void;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export function BookingFlow({
  service,
  onBack,
  onComplete,
}: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && selectedTime) {
      setStep(3);
    }
  };

  const handleConfirm = () => {
    const booking = {
      service: service.name,
      date: selectedDate?.toLocaleDateString("en-IN"),
      time: selectedTime,
      price: service.price,
      status: "upcoming",
    };
    onComplete(booking);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() =>
            step === 1 ? onBack() : setStep(step - 1)
          }
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#2ECC71] text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <span className="ml-2 hidden md:inline">Date</span>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${step >= 2 ? "bg-[#2ECC71]" : ""}`}
              style={{ width: step >= 2 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#2ECC71] text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <span className="ml-2 hidden md:inline">Time</span>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${step >= 3 ? "bg-[#2ECC71]" : ""}`}
              style={{ width: step >= 3 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#2ECC71] text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <span className="ml-2 hidden md:inline">
              Confirm
            </span>
          </div>
        </div>

        {/* Service Details */}
        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">
              {service.description}
            </p>
            <p className="text-[#F39C12]">{service.price}</p>
          </CardContent>
        </Card>

        {/* Step 1: Date Selection */}
        {step === 1 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedDate}
                  className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  Next: Select Time
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Select Time Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 border rounded-lg transition-all ${
                      selectedTime === time
                        ? "border-[#F39C12] bg-[#F39C12]/10 text-[#F39C12]"
                        : "border-gray-300 hover:border-[#F39C12]"
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedTime}
                  className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  Next: Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Confirm Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Service
                  </p>
                  <p>{service.name}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Date
                    </p>
                    <p>
                      {selectedDate?.toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </p>
                    <p>{selectedTime}</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-[#F39C12]/5">
                  <div className="flex justify-between items-center">
                    <span>Total Amount</span>
                    <span className="text-[#F39C12]">
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  Confirm & Pay
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                * Payment integration with Razorpay will be
                added
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}