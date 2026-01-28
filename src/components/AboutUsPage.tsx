import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Heart,
  Target,
  Users,
  Award,
  Shield,
  Sparkles,
} from "lucide-react";

export function AboutUsPage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart
              className="w-16 h-16 text-[#F39C12]"
              fill="#F39C12"
            />
          </div>
          <h1 className="mb-4">About Parents Luxuria</h1>
          <p className="text-xl text-[#F39C12] mb-2">
            Premium Senior Wellness & Lifestyle Care
          </p>
          <p className="text-lg text-muted-foreground italic">
            "Because They Deserve the Best Care in Their Golden
            Years"
          </p>
        </div>

        {/* Our Story */}
        <Card className="mb-8 bg-gradient-to-br from-[#ECF0F1] to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#F39C12]" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#34495E]">
            <p>
              Parents Luxuria was founded with a simple yet
              profound mission: to ensure that our senior
              citizens receive the care, dignity, and luxury
              they truly deserve. We understand that the
              generation that built our world deserves nothing
              less than excellence in their golden years.
            </p>
            <p>
              Born from personal experiences of caring for aging
              parents, we recognized a gap in the market for
              premium, comprehensive senior wellness services
              that truly prioritize quality, comfort, and
              dignity. Today, we're proud to serve hundreds of
              families across India, bringing peace of mind to
              children and exceptional care to their beloved
              parents.
            </p>
            <p>
              Our platform connects families with verified,
              professional service providers across six core
              wellness categories, ensuring that every aspect of
              senior care is addressed with expertise and
              compassion.
            </p>
          </CardContent>
        </Card>

        {/* Our Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#2C3E50]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-[#2C3E50]" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[#34495E]">
              <p>
                To revolutionize senior care by providing
                accessible, premium wellness services that
                enhance the quality of life for senior citizens
                while giving their families peace of mind
                through verified, professional, and
                compassionate care providers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#2ECC71]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#2ECC71]" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[#34495E]">
              <p>
                To become India's most trusted senior wellness
                platform, setting the gold standard for elderly
                care services and creating a world where every
                senior citizen can age gracefully with dignity,
                health, and happiness.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#F39C12]" />
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#2ECC71]" />
                  Trust & Safety
                </h3>
                <p className="text-[#34495E] text-sm">
                  Every service provider is thoroughly verified
                  and background-checked to ensure the safety
                  and security of our senior community.
                </p>
              </div>

              <div>
                <h3 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#F39C12]" />
                  Compassion
                </h3>
                <p className="text-[#34495E] text-sm">
                  We believe in treating every senior with the
                  love, respect, and dignity they deserve, just
                  as we would treat our own parents.
                </p>
              </div>

              <div>
                <h3 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#2C3E50]" />
                  Excellence
                </h3>
                <p className="text-[#34495E] text-sm">
                  We maintain the highest standards of service
                  quality, continuously improving to provide
                  nothing but the best for our community.
                </p>
              </div>

              <div>
                <h3 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2ECC71]" />
                  Accessibility
                </h3>
                <p className="text-[#34495E] text-sm">
                  Premium care shouldn't be a luxury. We work to
                  make quality senior wellness services
                  accessible to all families who need them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Impact */}
        <Card className="bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] text-white">
          <CardHeader>
            <CardTitle>Our Impact by Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">5000+</p>
                <p className="text-sm opacity-90">
                  Seniors Served
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-sm opacity-90">
                  Verified Partners
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">
                  20,000+
                </p>
                <p className="text-sm opacity-90">
                  Services Delivered
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">4.8★</p>
                <p className="text-sm opacity-90">
                  Average Rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#F39C12]" />
              Why Choose Parents Luxuria?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-[#34495E]">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F39C12] mt-2 flex-shrink-0" />
                <p>
                  <strong>Comprehensive Care:</strong> Six
                  specialized wellness modules covering every
                  aspect of senior health and lifestyle.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] mt-2 flex-shrink-0" />
                <p>
                  <strong>Verified Professionals:</strong> All
                  service providers undergo rigorous background
                  checks and verification processes.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2C3E50] mt-2 flex-shrink-0" />
                <p>
                  <strong>Easy Booking:</strong> Simple,
                  intuitive platform designed with seniors and
                  families in mind.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F39C12] mt-2 flex-shrink-0" />
                <p>
                  <strong>24/7 Support:</strong> Our dedicated
                  support team is always available to help you
                  and your loved ones.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] mt-2 flex-shrink-0" />
                <p>
                  <strong>Transparent Pricing:</strong> No
                  hidden costs, clear pricing structure for all
                  services.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2C3E50] mt-2 flex-shrink-0" />
                <p>
                  <strong>Quality Assurance:</strong> Regular
                  feedback and rating system ensures consistent
                  service excellence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}