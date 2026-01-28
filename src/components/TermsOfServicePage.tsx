import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  FileText,
  AlertCircle,
  Shield,
  Clock,
  Users,
  Scale,
} from "lucide-react";

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-[#2C3E50] mx-auto mb-4" />
          <h1 className="mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last Updated: January 20, 2026
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-br from-[#ECF0F1] to-white">
          <CardContent className="p-6">
            <p className="text-[#34495E] leading-relaxed">
              Welcome to Parents Luxuria. These Terms of Service
              ("Terms") govern your access to and use of our
              platform, services, and applications. By accessing
              or using Parents Luxuria, you agree to be bound by
              these Terms. If you do not agree to these Terms,
              please do not use our services.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#2C3E50]" />
              1. Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              By creating an account, accessing, or using
              Parents Luxuria services, you acknowledge that you
              have read, understood, and agree to be bound by
              these Terms and our Privacy Policy.
            </p>
            <p>
              These Terms constitute a legally binding agreement
              between you and Parents Luxuria Private Limited, a
              company registered in India.
            </p>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-[#2ECC71]" />
              2. Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>To use Parents Luxuria services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>
                Have the legal capacity to enter into binding
                contracts
              </li>
              <li>
                Provide accurate and complete registration
                information
              </li>
              <li>
                Maintain the security of your account
                credentials
              </li>
              <li>
                Not be prohibited from using our services under
                applicable laws
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Services Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Description of Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <p>
              Parents Luxuria operates as a platform that
              connects users with verified service providers
              offering senior wellness services including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>CareNest - Home Nursing & Care</li>
              <li>NutriScan - Health Checkups & Diagnostics</li>
              <li>MealAura - Meal Planning & Nutrition</li>
              <li>RejuvaFit - Fitness & Wellness</li>
              <li>BlissTouch - Grooming & Spa</li>
            </ul>
            <p className="pt-3">
              <strong>Important:</strong> Parents Luxuria acts
              as an intermediary platform. We do not directly
              provide healthcare or wellness services. All
              services are provided by independent, verified
              service providers.
            </p>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-[#F39C12]" />
              4. User Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                4.1 Account Security
              </h3>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  Maintaining the confidentiality of your
                  password
                </li>
                <li>
                  All activities that occur under your account
                </li>
                <li>
                  Notifying us immediately of unauthorized
                  access
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                4.2 Accurate Information
              </h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  Provide accurate, current, and complete
                  information
                </li>
                <li>
                  Update your information to maintain accuracy
                </li>
                <li>
                  Provide truthful health information when
                  booking medical services
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                4.3 Prohibited Conduct
              </h3>
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Use the platform for unlawful purposes</li>
                <li>
                  Harass, abuse, or harm service providers or
                  other users
                </li>
                <li>Submit false or misleading information</li>
                <li>
                  Attempt to gain unauthorized access to the
                  platform
                </li>
                <li>
                  Interfere with the proper functioning of the
                  platform
                </li>
                <li>
                  Use automated systems to access the platform
                  without permission
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Booking and Payments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Bookings and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                5.1 Service Bookings
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  All bookings are subject to service provider
                  availability
                </li>
                <li>
                  Booking confirmations are sent via email and
                  SMS
                </li>
                <li>
                  Service details must be reviewed before
                  confirmation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                5.2 Payment Terms
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Payment must be made at the time of booking or
                  as specified
                </li>
                <li>
                  All prices are in Indian Rupees (INR) unless
                  stated otherwise
                </li>
                <li>
                  Prices include applicable taxes unless stated
                  otherwise
                </li>
                <li>
                  We accept various payment methods as displayed
                  during checkout
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                5.3 Service Provider Fees
              </h3>
              <p>
                Parents Luxuria charges a service fee for
                facilitating connections between users and
                service providers. This fee is included in the
                total price displayed during booking.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation and Refunds */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#E74C3C]" />
              6. Cancellation and Refund Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              Our cancellation and refund policy varies by
              service type:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>24+ hours notice:</strong> Full refund
                (100%)
              </li>
              <li>
                <strong>12-24 hours notice:</strong> Partial
                refund (50%)
              </li>
              <li>
                <strong>Less than 12 hours:</strong> No refund
              </li>
              <li>
                <strong>Service provider cancellation:</strong>{" "}
                Full refund
              </li>
            </ul>
            <p className="pt-3">
              Refunds are processed within 7-10 business days.
              Please refer to our detailed Refund Policy for
              complete information.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer of Warranties */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              <strong>
                THE PLATFORM AND SERVICES ARE PROVIDED "AS IS"
                AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
                KIND.
              </strong>
            </p>
            <p>Parents Luxuria does not warrant that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                The platform will be uninterrupted or error-free
              </li>
              <li>Defects will be corrected</li>
              <li>
                The platform is free from viruses or harmful
                components
              </li>
              <li>
                Service providers will meet your expectations
              </li>
            </ul>
            <p className="pt-3">
              We verify service providers but do not guarantee
              the quality of services provided. Users should
              exercise their own judgment when booking services.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#9B59B6]" />
              8. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PARENTS
              LUXURIA SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Indirect, incidental, special, consequential, or
                punitive damages
              </li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Actions or inactions of service providers</li>
              <li>
                Quality of services provided by third-party
                providers
              </li>
              <li>
                Medical complications or adverse health events
              </li>
            </ul>
            <p className="pt-3">
              Our total liability shall not exceed the amount
              paid by you for the specific service giving rise
              to the claim.
            </p>
          </CardContent>
        </Card>

        {/* Indemnification */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p>
              You agree to indemnify and hold harmless Parents
              Luxuria, its affiliates, officers, directors,
              employees, and agents from any claims, damages,
              losses, liabilities, and expenses (including legal
              fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Your use of the platform</li>
              <li>Violation of these Terms</li>
              <li>Violation of any rights of another party</li>
              <li>Your interactions with service providers</li>
            </ul>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>10. Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                10.1 Informal Resolution
              </h3>
              <p>
                In the event of any dispute, you agree to first
                contact us at support@parentsluxuria.com to seek
                an informal resolution.
              </p>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                10.2 Governing Law
              </h3>
              <p>
                These Terms shall be governed by the laws of
                India. Any disputes shall be subject to the
                exclusive jurisdiction of courts in Gurugram,
                Haryana.
              </p>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                10.3 Arbitration
              </h3>
              <p>
                If informal resolution fails, disputes shall be
                resolved through binding arbitration in
                accordance with the Arbitration and Conciliation
                Act, 1996.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>11. Modifications to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p>
              We reserve the right to modify these Terms at any
              time. We will notify users of material changes via
              email or platform notification. Your continued use
              of the platform after such modifications
              constitutes acceptance of the updated Terms.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>12. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>We may suspend or terminate your account if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You violate these Terms</li>
              <li>
                You engage in fraudulent or illegal activities
              </li>
              <li>
                Your account is inactive for an extended period
              </li>
              <li>We are required to do so by law</li>
            </ul>
            <p className="pt-3">
              You may terminate your account at any time by
              contacting support. Upon termination, your right
              to use the platform ceases immediately.
            </p>
          </CardContent>
        </Card>

        {/* Miscellaneous */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>13. Miscellaneous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              <strong>Entire Agreement:</strong> These Terms
              constitute the entire agreement between you and
              Parents Luxuria.
            </p>
            <p>
              <strong>Severability:</strong> If any provision is
              found unenforceable, the remaining provisions
              remain in effect.
            </p>
            <p>
              <strong>Waiver:</strong> Failure to enforce any
              right or provision does not constitute a waiver of
              that right.
            </p>
            <p>
              <strong>Assignment:</strong> You may not assign
              these Terms without our consent. We may assign our
              rights without restriction.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle>14. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For questions about these Terms, please contact
              us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> legal@parentsluxuria.com
              </p>
              <p>
                <strong>Phone:</strong> +91 1800-123-4567
              </p>
              <p>
                <strong>Address:</strong> Parents Luxuria
                Private Limited, Tower A, 5th Floor, DLF Cyber
                City, Gurugram, Haryana 122002, India
              </p>
            </div>
            <p className="mt-6 text-sm opacity-90">
              By using Parents Luxuria, you acknowledge that you
              have read, understood, and agree to be bound by
              these Terms of Service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}