import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Shield,
  Calendar,
  Lock,
  Eye,
  Users,
  Database,
  Cookie,
  Mail,
} from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-[#2C3E50] mx-auto mb-4" />
          <h1 className="mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: January 20, 2026
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-br from-[#ECF0F1] to-white">
          <CardContent className="p-6">
            <p className="text-[#34495E] leading-relaxed">
              At Parents Luxuria, we are committed to protecting
              your privacy and ensuring the security of your
              personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your
              information when you use our platform and
              services. Please read this policy carefully to
              understand our practices regarding your personal
              data.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-[#2C3E50]" />
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                1.1 Personal Information
              </h3>
              <p className="mb-2">
                We collect personal information that you provide
                directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, phone number</li>
                <li>Address and location information</li>
                <li>Date of birth and age</li>
                <li>Payment and billing information</li>
                <li>Emergency contact details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                1.2 Health Information
              </h3>
              <p className="mb-2">
                With your explicit consent, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Medical history and current conditions</li>
                <li>Medication information</li>
                <li>Dietary restrictions and preferences</li>
                <li>Health reports and test results</li>
                <li>Mobility and accessibility requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                1.3 Usage Information
              </h3>
              <p className="mb-2">
                We automatically collect certain information
                when you use our platform:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Device information (type, operating system,
                  browser)
                </li>
                <li>IP address and location data</li>
                <li>Booking and service usage history</li>
                <li>
                  Communication records with service providers
                </li>
                <li>Preferences and feedback</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#2ECC71]" />
              2. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Provide Services:</strong> Process
                bookings, coordinate with service providers, and
                deliver requested wellness services
              </li>
              <li>
                <strong>Communication:</strong> Send booking
                confirmations, service updates, and important
                notifications
              </li>
              <li>
                <strong>Improve Platform:</strong> Analyze usage
                patterns to enhance user experience and service
                quality
              </li>
              <li>
                <strong>Safety & Security:</strong> Verify
                identities, prevent fraud, and ensure platform
                security
              </li>
              <li>
                <strong>Customer Support:</strong> Respond to
                inquiries, resolve issues, and provide
                assistance
              </li>
              <li>
                <strong>Marketing:</strong> Send promotional
                offers and service updates (with your consent)
              </li>
              <li>
                <strong>Legal Compliance:</strong> Comply with
                applicable laws and regulatory requirements
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-[#F39C12]" />
              3. Information Sharing and Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.1 With Service Providers
              </h3>
              <p>
                We share necessary information with verified
                service providers (nurses, nutritionists,
                trainers, etc.) to fulfill your bookings. They
                receive only the information needed to provide
                the specific service you've requested.
              </p>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.2 With Third-Party Service Providers
              </h3>
              <p>
                We may share information with trusted third
                parties who help us operate our platform,
                including payment processors, cloud storage
                providers, and analytics services. These parties
                are contractually obligated to protect your
                information.
              </p>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.3 Legal Requirements
              </h3>
              <p>
                We may disclose your information if required by
                law, court order, or governmental request, or to
                protect our rights, property, or safety.
              </p>
            </div>

            <div>
              <h3 className="text-[#2C3E50] mb-2">
                3.4 With Your Consent
              </h3>
              <p>
                We will share your information with any other
                parties when you provide explicit consent to do
                so.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#E74C3C]" />
              4. Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              We implement industry-standard security measures
              to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>
                Secure servers and databases with restricted
                access
              </li>
              <li>
                Regular security audits and vulnerability
                assessments
              </li>
              <li>
                Employee training on data protection practices
              </li>
              <li>
                Two-factor authentication for sensitive accounts
              </li>
              <li>
                Regular backups and disaster recovery procedures
              </li>
            </ul>
            <p className="pt-2 text-sm">
              While we strive to protect your information, no
              method of transmission over the internet is 100%
              secure. We cannot guarantee absolute security but
              continuously work to improve our safeguards.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#9B59B6]" />
              5. Your Rights and Choices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              You have the following rights regarding your
              personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the
                personal information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Update or correct
                inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of
                your personal information (subject to legal
                requirements)
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from
                marketing communications at any time
              </li>
              <li>
                <strong>Data Portability:</strong> Request your
                data in a portable format
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw
                consent for data processing where applicable
              </li>
            </ul>
            <p className="pt-3">
              To exercise these rights, please contact us at{" "}
              <strong>privacy@parentsluxuria.com</strong>
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="w-6 h-6 text-[#F39C12]" />
              6. Cookies and Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#34495E]">
            <p>
              We use cookies and similar technologies to enhance
              your experience, analyze platform usage, and
              personalize content. You can control cookie
              preferences through your browser settings.
            </p>
            <p>Types of cookies we use:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for
                platform functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us
                understand how users interact with our platform
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember
                your settings and preferences
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used for
                personalized advertising (with consent)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#2ECC71]" />
              7. Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p className="mb-3">
              We retain your personal information for as long as
              necessary to provide our services and comply with
              legal obligations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Active account data: Duration of account
                activity plus 3 years
              </li>
              <li>
                Health records: 7 years from last service (as
                per medical regulations)
              </li>
              <li>
                Transaction records: 7 years (as per tax
                regulations)
              </li>
              <li>
                Marketing data: Until you opt-out or request
                deletion
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p>
              Our services are not directed to individuals under
              18 years of age. We do not knowingly collect
              personal information from children. If you are a
              parent or guardian and believe your child has
              provided us with personal information, please
              contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              9. Changes to This Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#34495E]">
            <p>
              We may update this Privacy Policy from time to
              time to reflect changes in our practices or legal
              requirements. We will notify you of any material
              changes by posting the new policy on our platform
              and updating the "Last Updated" date. Your
              continued use of our services after such changes
              constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6" />
              10. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you have any questions, concerns, or requests
              regarding this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                privacy@parentsluxuria.com
              </p>
              <p>
                <strong>Phone:</strong> +91 1800-123-4567
              </p>
              <p>
                <strong>Address:</strong> Data Protection
                Officer, Parents Luxuria, Tower A, 5th Floor,
                DLF Cyber City, Gurugram, Haryana 122002, India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}