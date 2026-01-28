import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface ServiceListPageProps {
  module: string;
  onBack: () => void;
  onServiceSelect: (service: any) => void;
}

const serviceData: Record<string, any> = {
  carenest: {
    title: "CareNest",
    services: [
      {
        id: 1,
        name: "Home Nursing (8 hours)",
        description: "Professional nursing care at home",
        price: "₹2,500",
      },
      {
        id: 2,
        name: "Home Nursing (12 hours)",
        description: "Extended nursing support",
        price: "₹3,500",
      },
      {
        id: 3,
        name: "Elder Care Support",
        description: "Comprehensive elder care assistance",
        price: "₹2,000",
      },
      {
        id: 4,
        name: "Medical Equipment Rental",
        description: "Oxygen, wheelchair, and more",
        price: "₹500/day",
      },
    ],
  },
  nutriscan: {
    title: "NutriScan",
    services: [
      {
        id: 1,
        name: "Full Body Checkup",
        description: "Comprehensive health screening",
        price: "₹3,999",
      },
      {
        id: 2,
        name: "Doctor Consultation",
        description: "Video/In-person consultation",
        price: "₹800",
      },
      {
        id: 3,
        name: "Blood Test Panel",
        description: "Complete blood analysis",
        price: "₹1,500",
      },
      {
        id: 4,
        name: "ECG & Heart Checkup",
        description: "Cardiac health assessment",
        price: "₹1,200",
      },
    ],
  },
  mealaura: {
    title: "MealAura",
    services: [
      {
        id: 1,
        name: "Weekly Meal Plan",
        description: "Customized healthy meals for 7 days",
        price: "₹4,999",
      },
      {
        id: 2,
        name: "Monthly Meal Plan",
        description: "30 days of nutritious meals",
        price: "₹18,999",
      },
      {
        id: 3,
        name: "Diabetic-Friendly Meals",
        description: "Specialized diet plan",
        price: "₹5,999/week",
      },
      {
        id: 4,
        name: "Nutritionist Consultation",
        description: "Personalized diet planning",
        price: "₹1,500",
      },
    ],
  },
  rejuvafit: {
    title: "RejuvaFit",
    services: [
      {
        id: 1,
        name: "Yoga Session (Single)",
        description: "One-on-one yoga training at home",
        price: "₹800",
      },
      {
        id: 2,
        name: "Yoga Package (10 sessions)",
        description: "Flexible yoga program",
        price: "₹7,000",
      },
      {
        id: 3,
        name: "Physiotherapy Session",
        description: "Professional physio treatment",
        price: "₹1,200",
      },
      {
        id: 4,
        name: "At-Home Fitness Training",
        description: "Personalized fitness routine",
        price: "₹1,000",
      },
    ],
  },
  blisstouch: {
    title: "BlissTouch",
    services: [
      {
        id: 1,
        name: "Hair Salon Service",
        description: "Haircut, styling, and grooming",
        price: "₹1,500",
      },
      {
        id: 2,
        name: "Massage Therapy (60 min)",
        description: "Relaxing therapeutic massage",
        price: "₹2,500",
      },
      {
        id: 3,
        name: "Spa Package",
        description: "Complete wellness spa experience",
        price: "₹4,999",
      },
      {
        id: 4,
        name: "Manicure & Pedicure",
        description: "Hand and foot care",
        price: "₹1,200",
      },
    ],
  },
  silvercircle: {
    title: "SilverCircle",
    services: [
      {
        id: 1,
        name: "Book Club Membership",
        description: "Monthly book discussion groups",
        price: "₹500/month",
      },
      {
        id: 2,
        name: "Art & Craft Workshop",
        description: "Creative activity sessions",
        price: "₹800",
      },
      {
        id: 3,
        name: "Musical Evening",
        description: "Live music and social gathering",
        price: "₹300",
      },
      {
        id: 4,
        name: "Gardening Club",
        description: "Community gardening activities",
        price: "₹400/month",
      },
    ],
  },
};

export function ServiceListPage({
  module,
  onBack,
  onServiceSelect,
}: ServiceListPageProps) {
  const moduleData = serviceData[module] || {
    title: "Services",
    services: [],
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

        <div className="mb-8">
          <h1 className="mb-2">{moduleData.title}</h1>
          <p className="text-muted-foreground">
            Choose a service to view details and book an
            appointment
          </p>
        </div>

        <div className="grid gap-4">
          {moduleData.services.map((service: any) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-[#F39C12] bg-white"
              onClick={() => onServiceSelect(service)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2">{service.name}</h3>
                    <CardDescription>
                      {service.description}
                    </CardDescription>
                    <p className="text-[#F39C12] mt-2">
                      {service.price}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}