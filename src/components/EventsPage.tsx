import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { OptimizedImage } from "./common/OptimizedImage";
import { getEventImage } from "../constants/images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner@2.0.3";

interface EventsPageProps {
  onBack: () => void;
}

const mockEvents = [
  {
    id: 1,
    name: "Musical Evening with Classical Legends",
    date: "2025-11-15",
    time: "6:00 PM",
    location: "Community Center, Sector 12",
    attendees: 45,
    maxAttendees: 60,
    category: "Music",
    description: "An evening of classical music performances",
  },
  {
    id: 2,
    name: "Art & Craft Workshop",
    date: "2025-11-18",
    time: "3:00 PM",
    location: "Creative Studio, Downtown",
    attendees: 28,
    maxAttendees: 30,
    category: "Art",
    description: "Learn pottery and painting techniques",
  },
  {
    id: 3,
    name: "Book Club: Monthly Discussion",
    date: "2025-11-20",
    time: "4:00 PM",
    location: "Library Hall, City Center",
    attendees: 22,
    maxAttendees: 40,
    category: "Literature",
    description: "Discussion on latest bestseller",
  },
  {
    id: 4,
    name: "Gardening Club Meet",
    date: "2025-11-25",
    time: "10:00 AM",
    location: "Botanical Garden",
    attendees: 35,
    maxAttendees: 50,
    category: "Gardening",
    description: "Seasonal planting workshop",
  },
];

export function EventsPage({ onBack }: EventsPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [bookedEvents, setBookedEvents] = useState<number[]>(
    [],
  );

  const handleBook = (event: any) => {
    setBookedEvents([...bookedEvents, event.id]);
    setSelectedEvent(null);
    toast.success(`Booking confirmed for ${event.name}!`, {
      description: `You're all set for ${new Date(
        event.date,
      ).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })} at ${event.time}`,
      icon: <CheckCircle2 className="w-5 h-5 text-[#2ECC71]" />,
    });
  };

  const isBooked = (eventId: number) =>
    bookedEvents.includes(eventId);

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

        <div className="mb-8">
          <h1 className="mb-2">SilverCircle Events</h1>
          <p className="text-muted-foreground">
            Join social activities and connect with the senior
            community
          </p>
        </div>

        <div className="grid gap-6">
          {mockEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden bg-white"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <OptimizedImage
                    src={getEventImage(event.category)}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge className="mb-3 bg-[#2ECC71] hover:bg-[#2ECC71]/90">
                        {event.category}
                      </Badge>
                      <h3 className="mb-2">{event.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees}{" "}
                      attending
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isBooked(event.id) ? (
                      <Button
                        className="flex-1 bg-[#2ECC71] hover:bg-[#2ECC71]/90"
                        disabled
                      >
                        Booked
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 bg-[#F39C12] hover:bg-[#F39C12]/90"
                        onClick={() => handleBook(event)}
                      >
                        Book
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {mockEvents.length === 0 && (
          <Card className="bg-white">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground">
                Check back soon for new community events and
                activities.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog
        open={selectedEvent !== null}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.name}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {selectedEvent &&
                new Date(selectedEvent.date).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  },
                )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {selectedEvent?.time}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {selectedEvent?.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              {selectedEvent?.attendees}/
              {selectedEvent?.maxAttendees} attending
            </div>
          </div>

          <DialogFooter>
            {isBooked(selectedEvent?.id) ? (
              <Button
                className="w-full bg-[#2ECC71] hover:bg-[#2ECC71]/90"
                disabled
              >
                Booked
              </Button>
            ) : (
              <Button
                className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={() => handleBook(selectedEvent)}
              >
                Book
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}