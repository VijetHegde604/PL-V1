import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  RotateCcw,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <RotateCcw className="w-16 h-16 text-[#2C3E50] mx-auto mb-4" />
          <h1 className="mb-4">Refund & Cancellation Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: January 20, 2026
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-br from-[#ECF0F1] to-white">
          <CardContent className="p-6">
            <p className="text-[#34495E] leading-relaxed">
              At Parents Luxuria, we understand that plans can
              change. This Refund and Cancellation Policy
              outlines the terms and conditions for canceling
              services and requesting refunds. We aim to be fair
              to both our users and our service providers while
              maintaining high service standards.
            </p>
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-[#E74C3C]" />
              1. Cancellation Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <p>
              You may cancel your booking through the platform
              or by contacting customer support. Cancellation
              eligibility and refund amounts depend on the
              timing of your cancellation.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="border-2 border-[#2ECC71]">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-[#2ECC71] mx-auto mb-3" />
                  <h3 className="text-[#2C3E50] mb-2">
                    24+ Hours
                  </h3>
                  <p className="text-3xl font-bold text-[#2ECC71] mb-2">
                    100%
                  </p>
                  <p className="text-sm">Full Refund</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#F39C12]">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="w-12 h-12 text-[#F39C12] mx-auto mb-3" />
                  <h3 className="text-[#2C3E50] mb-2">
                    12-24 Hours
                  </h3>
                  <p className="text-3xl font-bold text-[#F39C12] mb-2">
                    50%
                  </p>
                  <p className="text-sm">Partial Refund</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#E74C3C]">
                <CardContent className="p-4 text-center">
                  <XCircle className="w-12 h-12 text-[#E74C3C] mx-auto mb-3" />
                  <h3 className="text-[#2C3E50] mb-2">
                    &lt; 12 Hours
                  </h3>
                  <p className="text-3xl font-bold text-[#E74C3C] mb-2">
                    0%
                  </p>
                  <p className="text-sm">No Refund</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-[#ECF0F1] rounded-lg">
              <h3 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Important Notes:
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>
                  Cancellation time is calculated from the
                  scheduled service start time
                </li>
                <li>
                  Cancellations must be made through the
                  platform or confirmed by customer support
                </li>
                <li>
                  Email or phone call cancellations are
                  processed based on timestamp received
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Service-Specific Policies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              2. Service-Specific Cancellation Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#2C3E50]" />
                CareNest (Home Nursing & Care)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>
                    Long-term contracts (7+ days):
                  </strong>{" "}
                  48-hour cancellation notice required for full
                  refund
                </li>
                <li>
                  <strong>24-hour nursing:</strong> Minimum
                  12-hour notice required
                </li>
                <li>
                  <strong>Emergency services:</strong>{" "}
                  Non-refundable once provider is dispatched
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#2ECC71]" />
                NutriScan (Health Checkups & Diagnostics)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Lab tests:</strong> Must cancel before
                  sample collection
                </li>
                <li>
                  <strong>Home sample collection:</strong>{" "}
                  Cancel at least 6 hours before scheduled time
                </li>
                <li>
                  <strong>Health packages:</strong> Standard
                  cancellation policy applies
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#F39C12]" />
                MealAura (Meal Planning & Nutrition)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Meal subscriptions:</strong> Cancel
                  within 48 hours of start for pro-rated refund
                </li>
                <li>
                  <strong>Custom meal plans:</strong>{" "}
                  Non-refundable after plan is delivered
                </li>
                <li>
                  <strong>Consultation sessions:</strong>{" "}
                  Standard 24-hour policy applies
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#E74C3C]" />
                RejuvaFit (Fitness & Wellness)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Class packages:</strong> Unused
                  sessions can be refunded with 7-day notice
                </li>
                <li>
                  <strong>Personal training:</strong> 24-hour
                  cancellation policy applies
                </li>
                <li>
                  <strong>Group classes:</strong> 12-hour
                  cancellation notice required
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#9B59B6]" />
                BlissTouch (Grooming & Spa)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spa packages:</strong> 24-hour
                  cancellation notice required
                </li>
                <li>
                  <strong>At-home services:</strong> Cancel at
                  least 12 hours in advance
                </li>
                <li>
                  <strong>Special treatments:</strong> May have
                  extended cancellation windows
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Refund Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#2ECC71]" />
              3. Refund Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.1 How to Request a Refund
              </h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Log in to your Parents Luxuria account</li>
                <li>Navigate to "My Bookings"</li>
                <li>Select the booking you wish to cancel</li>
                <li>
                  Click "Cancel Booking" and follow the prompts
                </li>
                <li>
                  Alternatively, contact customer support at
                  support@parentsluxuria.com
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.2 Refund Timeline
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Credit/Debit Cards:</strong> 7-10
                  business days
                </li>
                <li>
                  <strong>UPI/Net Banking:</strong> 5-7 business
                  days
                </li>
                <li>
                  <strong>Wallet:</strong> Instant credit to
                  Parents Luxuria wallet
                </li>
                <li>
                  <strong>Cash payments:</strong> Bank transfer
                  within 10 business days
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.3 Refund Method
              </h3>
              <p>
                Refunds are processed to the original payment
                method used for booking. In cases where the
                original method is unavailable, refunds will be
                credited to your Parents Luxuria wallet for
                future bookings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Provider Cancellations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#2ECC71]" />
              4. Service Provider Cancellations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>If a service provider cancels your booking:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Full refund:</strong> You will receive a
                100% refund regardless of timing
              </li>
              <li>
                <strong>Priority rebooking:</strong> We will
                help you find an alternative provider at no
                extra cost
              </li>
              <li>
                <strong>Compensation:</strong> You may receive a
                discount voucher for future bookings
              </li>
              <li>
                <strong>Emergency cancellations:</strong> In
                case of genuine emergencies, we work to find
                immediate replacements
              </li>
            </ul>
            <p className="pt-3 text-sm bg-[#ECF0F1] p-3 rounded">
              <strong>Note:</strong> Service provider
              cancellations are rare due to our quality
              standards and verification process.
            </p>
          </CardContent>
        </Card>

        {/* Non-Refundable Situations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-[#E74C3C]" />
              5. Non-Refundable Situations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              Refunds will NOT be provided in the following
              cases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>No-show:</strong> If you or the care
                recipient is not present at the scheduled time
                and location
              </li>
              <li>
                <strong>Service completed:</strong> After the
                service has been fully delivered
              </li>
              <li>
                <strong>Customer dissatisfaction:</strong> Due
                to subjective preferences or expectations (use
                our dispute resolution process instead)
              </li>
              <li>
                <strong>Incorrect information:</strong> If you
                provided wrong contact details or address
              </li>
              <li>
                <strong>Third-party issues:</strong> Problems
                caused by factors outside our or the provider's
                control
              </li>
              <li>
                <strong>Promotional services:</strong> Free or
                heavily discounted services may be
                non-refundable
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Modification Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Booking Modifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              Need to change your booking instead of canceling?
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Rescheduling:</strong> Free if done 24+
                hours in advance, subject to provider
                availability
              </li>
              <li>
                <strong>Service upgrades:</strong> Pay the
                difference; downgrades follow cancellation
                policy
              </li>
              <li>
                <strong>Address changes:</strong> Must be within
                the same service area; notify at least 12 hours
                before
              </li>
              <li>
                <strong>Contact changes:</strong> Update anytime
                through your account
              </li>
            </ul>
            <p className="pt-3">
              To modify a booking, log in to your account or
              contact customer support at least 24 hours before
              your scheduled service.
            </p>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              7. Quality Issues and Disputes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>If you're unhappy with a service:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Report the issue within 24 hours of service
                completion
              </li>
              <li>
                Our team will investigate and contact the
                service provider
              </li>
              <li>
                We may offer: Re-service, partial refund, or
                full refund based on findings
              </li>
              <li>
                Resolution typically within 5-7 business days
              </li>
            </ol>
            <p className="pt-3">
              <strong>Evidence Required:</strong> Photos,
              videos, or detailed descriptions help us resolve
              disputes faster.
            </p>
          </CardContent>
        </Card>

        {/* Subscription Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              8. Subscription and Package Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                8.1 Monthly Subscriptions
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Can be canceled anytime with 7-day notice
                </li>
                <li>Pro-rated refund for unused portion</li>
                <li>
                  No refund for partially used billing periods
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                8.2 Service Packages
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Unused sessions can be refunded within
                  validity period
                </li>
                <li>
                  Refund calculated based on per-session pricing
                </li>
                <li>
                  Administrative fee may apply (up to 10%)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Force Majeure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Force Majeure</CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p className="mb-3">
              In case of events beyond our or the service
              provider's control (natural disasters, government
              restrictions, medical emergencies, etc.):
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Services may be rescheduled without penalty
              </li>
              <li>
                Full refund provided if rescheduling is not
                possible
              </li>
              <li>Credits may be offered for future use</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle>10. Questions About Refunds?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For any questions regarding cancellations,
              refunds, or to initiate a refund request, please
              contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                refunds@parentsluxuria.com
              </p>
              <p>
                <strong>Customer Support:</strong>{" "}
                support@parentsluxuria.com
              </p>
              <p>
                <strong>Phone:</strong> +91 1800-123-4567
              </p>
              <p>
                <strong>Live Chat:</strong> Available on our
                platform 9 AM - 9 PM
              </p>
            </div>
            <p className="mt-6 text-sm opacity-90">
              We're committed to fair and transparent refund
              practices. Our goal is to ensure your satisfaction
              while respecting the time and effort of our
              service providers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}