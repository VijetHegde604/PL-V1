import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Heart,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Home,
  Calendar,
  Users,
} from "lucide-react";

interface OurServicesPageProps {
  onNavigate?: (page: string) => void;
}

export function OurServicesPage({
  onNavigate,
}: OurServicesPageProps) {
  const services = [
    {
      id: "carenest",
      title: "CareNest",
      subtitle: "Home Nursing & Care",
      description:
        "Professional nursing care in the comfort of home. Our trained nurses provide medical assistance, medication management, wound care, and companionship.",
      icon: Home,
      color: "#2C3E50",
      services: [
        "24-Hour Home Nursing",
        "Post-Surgery Care",
        "Medication Management",
        "Wound Care & Dressing",
        "Elderly Companionship",
        "Vital Signs Monitoring",
      ],
    },
    {
      id: "nutriscan",
      title: "NutriScan",
      subtitle: "Health Checkups & Diagnostics",
      description:
        "Comprehensive health checkups and diagnostic services at home or in our partner clinics. Regular monitoring for preventive care.",
      icon: Stethoscope,
      color: "#2ECC71",
      services: [
        "Full Body Health Checkup",
        "Blood Tests & Analysis",
        "ECG & Heart Monitoring",
        "Diabetes Screening",
        "Bone Density Tests",
        "Home Sample Collection",
      ],
    },
    {
      id: "mealaura",
      title: "MealAura",
      subtitle: "Meal Planning & Nutrition",
      description:
        "Customized meal plans designed by nutritionists for senior dietary needs. Healthy, delicious, and medically appropriate meals.",
      icon: UtensilsCrossed,
      color: "#F39C12",
      services: [
        "Customized Meal Plans",
        "Diabetic-Friendly Menus",
        "Low-Sodium Diets",
        "Heart-Healthy Recipes",
        "Grocery Shopping Lists",
        "Nutrition Counseling",
      ],
    },
    {
      id: "rejuvafit",
      title: "RejuvaFit",
      subtitle: "Fitness & Wellness",
      description:
        "Age-appropriate fitness programs designed to maintain mobility, strength, and overall wellness for seniors.",
      icon: Dumbbell,
      color: "#E74C3C",
      services: [
        "Senior Yoga Classes",
        "Chair Exercises",
        "Walking & Balance Training",
        "Physiotherapy Sessions",
        "Flexibility Training",
        "Personal Training",
      ],
    },
    {
      id: "blisstouch",
      title: "BlissTouch",
      subtitle: "Grooming & Spa",
      description:
        "Premium grooming and spa services at home. Feel refreshed and rejuvenated with our professional beauty and wellness treatments.",
      icon: Sparkles,
      color: "#9B59B6",
      services: [
        "Hair Styling & Cut",
        "Spa & Massage",
        "Manicure & Pedicure",
        "Facial Treatments",
        "Grooming Packages",
        "At-Home Beauty Services",
      ],
    },
    {
      id: "silvercircle",
      title: "SilverCircle",
      subtitle: "Community & Events",
      description:
        "Connect with fellow seniors through engaging community events, social clubs, and group activities designed to foster friendships and active lifestyles.",
      icon: Users,
      color: "#3498DB",
      services: [
        "Book Club Membership",
        "Art & Craft Workshops",
        "Music & Cultural Events",
        "Gardening Clubs",
        "Social Gatherings",
        "Group Excursions",
      ],
    },
  ];

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart
              className="w-16 h-16 text-[#F39C12]"
              fill="#F39C12"
            />
          </div>
          <h1 className="mb-4">Our Premium Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive wellness solutions designed
            specifically for senior citizens. Every service is
            delivered by verified professionals with compassion
            and expertise.
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="overflow-hidden"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: service.color }}
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${service.color}20`,
                        }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: service.color }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {service.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#34495E] mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2">
                      <div
                        className="w-1 h-5 rounded"
                        style={{
                          backgroundColor: service.color,
                        }}
                      />
                      What We Offer:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.services.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-[#34495E]"
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: service.color,
                            }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {onNavigate && (
                    <Button
                      className="text-white"
                      style={{ backgroundColor: service.color }}
                      onClick={() => onNavigate("home")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book {service.title} Service
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Our Services Stand Out */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle>Why Our Services Stand Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  Verified Professionals
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Every service provider undergoes thorough
                  background verification and quality checks.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  At-Home Convenience
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Most services available at home for maximum
                  comfort and convenience of seniors.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  Customized Care Plans
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Services tailored to individual health needs,
                  preferences, and medical conditions.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  24/7 Support
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Round-the-clock customer support for
                  emergencies and service coordination.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  Transparent Pricing
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Clear, upfront pricing with no hidden charges
                  or surprise fees.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                  Quality Guarantee
                </h3>
                <p className="text-sm opacity-90 ml-4">
                  Regular quality audits and feedback systems
                  ensure consistent excellence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of families who trust Parents Luxuria
            for premium senior wellness care. Book your first
            service today and experience the difference.
          </p>
          {onNavigate && (
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={() => onNavigate("home")}
              >
                Browse All Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("contact")}
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}