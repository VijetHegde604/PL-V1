import { CareNestPartnerDashboard } from "./CareNestPartnerDashboard";
import { NutriScanPartnerDashboard } from "./NutriScanPartnerDashboard";
import { MealAuraPartnerDashboard } from "./MealAuraPartnerDashboard";
import { RejuvaFitPartnerDashboard } from "./RejuvaFitPartnerDashboard";
import { BlissTouchPartnerDashboard } from "./BlissTouchPartnerDashboard";

interface PartnerDashboardProps {
  partnerName: string;
  serviceType?:
    | "CareNest"
    | "NutriScan"
    | "MealAura"
    | "RejuvaFit"
    | "BlissTouch";
  bookingRequests?: any[];
  acceptedBookings?: any[];
  onAcceptBooking?: (bookingId: number) => void;
  onDeclineBooking?: (bookingId: number) => void;
}

export function PartnerDashboard({
  partnerName,
  serviceType = "CareNest",
}: PartnerDashboardProps) {
  // Route to the appropriate partner dashboard based on service type
  switch (serviceType) {
    case "CareNest":
      return (
        <CareNestPartnerDashboard partnerName={partnerName} />
      );
    case "NutriScan":
      return (
        <NutriScanPartnerDashboard partnerName={partnerName} />
      );
    case "MealAura":
      return (
        <MealAuraPartnerDashboard partnerName={partnerName} />
      );
    case "RejuvaFit":
      return (
        <RejuvaFitPartnerDashboard partnerName={partnerName} />
      );
    case "BlissTouch":
      return (
        <BlissTouchPartnerDashboard partnerName={partnerName} />
      );
    default:
      return (
        <CareNestPartnerDashboard partnerName={partnerName} />
      );
  }
}