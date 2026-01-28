import { Button } from "./ui/button";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "../constants/services";
import { ROUTES } from "../constants/routes";
import { memo } from "react";
import { motion } from "motion/react";
import heroImage from "figma:asset/3be6acb430bf49414d5658f62c9a730f6b9c70f1.png";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onServiceClick: (serviceId: string) => void;
  isLoggedIn: boolean;
}

export const LandingPage = memo(function LandingPage({
  onNavigate,
  onServiceClick,
  isLoggedIn,
}: LandingPageProps) {
  const handleServiceCardClick = (serviceId: string) => {
    if (isLoggedIn) {
      onServiceClick(serviceId);
    } else {
      onNavigate(ROUTES.LOGIN);
    }
  };

  // Calculate the total width for one set of services (350px per card + 24px gap)
  const cardWidth = 350;
  const gap = 24;
  const totalWidth = (cardWidth + gap) * SERVICES.length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2C3E50] to-[#2ECC71] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <p className="text-[#F39C12] mb-2">
                Parents Luxuria
              </p>
              <h1 className="mb-4">
                Premium Senior Wellness & Lifestyle Care
              </h1>
            </div>
            <p className="text-xl mb-6 text-white/90">
              Because They Deserve the Best Care in Their Golden
              Years.
            </p>
            <p className="mb-8 text-lg text-white/80">
              Experience luxury wellness services delivered to
              your doorstep. From healthcare to fitness, we
              provide comprehensive support for seniors with
              dignity, comfort, and excellence.
            </p>
            <Button
              className="bg-[#F39C12] hover:bg-[#F39C12]/90 text-white px-8 py-6"
              onClick={() =>
                onNavigate(
                  isLoggedIn
                    ? ROUTES.DASHBOARD
                    : ROUTES.REGISTER,
                )
              }
            >
              {isLoggedIn
                ? "Go to Dashboard"
                : "Get Started Today"}
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Senior receiving professional healthcare consultation at home"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive wellness solutions designed
              exclusively for senior care
            </p>
          </div>

          <div
            style={{
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <motion.div
              style={{
                display: "flex",
                gap: `${gap}px`,
                width: "max-content",
              }}
              animate={{
                x: [0, -totalWidth],
              }}
              transition={{
                x: {
                  duration: 43,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Render services twice for seamless loop */}
              {[...SERVICES, ...SERVICES].map(
                (service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    style={{
                      width: `${cardWidth}px`,
                      flexShrink: 0,
                    }}
                  >
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      onClick={() =>
                        handleServiceCardClick(service.id)
                      }
                    />
                  </div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
});