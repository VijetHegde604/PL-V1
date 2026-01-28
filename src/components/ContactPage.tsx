import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Thank you for contacting us! We'll get back to you within 24 hours.",
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

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
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help! Reach out to us for any
            questions, concerns, or feedback about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-[#2C3E50]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#2C3E50]" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#34495E] mb-2">
                  24/7 Customer Support
                </p>
                <p className="text-2xl text-[#2C3E50] font-semibold mb-1">
                  +91 1800-123-4567
                </p>
                <p className="text-sm text-muted-foreground">
                  Toll-free number for all inquiries
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#2ECC71]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#2ECC71]" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#34495E] mb-2">
                  General Inquiries:
                </p>
                <p className="text-lg text-[#2C3E50] mb-3">
                  info@parentsluxuria.com
                </p>
                <p className="text-[#34495E] mb-2">Support:</p>
                <p className="text-lg text-[#2C3E50]">
                  support@parentsluxuria.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#F39C12]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F39C12]" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#34495E] mb-2">
                  Parents Luxuria Headquarters
                </p>
                <p className="text-[#2C3E50]">
                  Tower A, 5th Floor
                  <br />
                  Cyber Hub, DLF Cyber City
                  <br />
                  Gurugram, Haryana 122002
                  <br />
                  India
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#9B59B6]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#9B59B6]" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-[#34495E]">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-[#2C3E50] font-semibold">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-[#2C3E50] font-semibold">
                      10:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-[#2C3E50] font-semibold">
                      Closed
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                    * Emergency support available 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-[#ECF0F1] to-white">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your inquiry in detail..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2">
                  How quickly will I receive a response?
                </h3>
                <p className="text-sm opacity-90">
                  We typically respond to all inquiries within
                  24 hours during business days. For urgent
                  matters, please call our 24/7 support line.
                </p>
              </div>

              <div>
                <h3 className="mb-2">
                  Can I schedule a service through this contact
                  form?
                </h3>
                <p className="text-sm opacity-90">
                  For service bookings, we recommend using our
                  online booking system for faster processing.
                  However, you can certainly reach out with
                  booking inquiries through this form.
                </p>
              </div>

              <div>
                <h3 className="mb-2">
                  Do you offer consultations?
                </h3>
                <p className="text-sm opacity-90">
                  Yes! We offer free consultations to help you
                  understand which services would be best for
                  your loved ones. Contact us to schedule one.
                </p>
              </div>

              <div>
                <h3 className="mb-2">
                  What areas do you serve?
                </h3>
                <p className="text-sm opacity-90">
                  We currently serve major metro cities across
                  India including Delhi NCR, Mumbai, Bangalore,
                  Hyderabad, Chennai, Pune, and Kolkata. Contact
                  us to check availability in your area.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="mt-8 border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-[#2C3E50] mb-1">
                  Emergency Support
                </h3>
                <p className="text-[#34495E] mb-2">
                  For urgent medical emergencies or immediate
                  assistance
                </p>
                <p className="text-2xl text-red-600 font-semibold">
                  +91 9999-HELP-911
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}