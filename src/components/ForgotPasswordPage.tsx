import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Heart,
  CheckCircle2,
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({
  onNavigate,
}: ForgotPasswordPageProps) {
  const [step, setStep] = useState<
    "email" | "otp" | "password" | "success"
  >("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Mock OTP for demo purposes
  const [generatedOtp] = useState("123456");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    toast.success(`OTP sent to ${email}`, {
      description: `Demo OTP: ${generatedOtp} (for testing)`,
    });
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      toast.success("OTP verified successfully!");
      setStep("password");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters long",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Simulate password reset
    toast.success("Password reset successful!");
    setStep("success");

    // Redirect to login after 2 seconds
    setTimeout(() => {
      onNavigate("login");
    }, 2000);
  };

  const handleResendOtp = () => {
    toast.success(`OTP resent to ${email}`, {
      description: `Demo OTP: ${generatedOtp} (for testing)`,
    });
  };

  // Success Screen
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-[#2ECC71]">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="w-16 h-16 text-[#2ECC71] mx-auto mb-4" />
                <h2 className="mb-2">
                  Password Reset Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your password has been reset successfully. You
                  can now login with your new password.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Redirecting to login page...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart
              className="w-12 h-12 text-[#F39C12]"
              fill="#F39C12"
            />
            <span className="text-2xl text-[#2C3E50]">
              Parents Luxuria
            </span>
          </div>
          <p className="text-sm text-[#F39C12] mb-3">
            Premium Senior Wellness Care
          </p>
          <p className="text-muted-foreground">
            Reset your password
          </p>
        </div>

        {/* Step 1: Enter Email */}
        {step === "email" && (
          <Card>
            <CardHeader>
              <CardTitle>Forgot Password?</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you an
                OTP to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSendOtp}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  Send OTP
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="text-sm text-[#2C3E50] hover:text-[#F39C12] inline-flex items-center gap-1"
                    onClick={() => onNavigate("login")}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Verify OTP */}
        {step === "otp" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F39C12]" />
                Verify OTP
              </CardTitle>
              <CardDescription>
                Enter the 6-digit OTP sent to{" "}
                <span className="font-semibold text-[#2C3E50]">
                  {email}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="otp">
                    One-Time Password (OTP)
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6),
                      )
                    }
                    required
                    maxLength={6}
                    className="bg-white text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo OTP: {generatedOtp} (for testing
                    purposes)
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive the OTP?{" "}
                    <button
                      type="button"
                      className="text-[#2C3E50] hover:text-[#F39C12]"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  </p>
                  <button
                    type="button"
                    className="text-sm text-[#2C3E50] hover:text-[#F39C12] inline-flex items-center gap-1"
                    onClick={() => setStep("email")}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change Email
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Enter New Password */}
        {step === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Password</CardTitle>
              <CardDescription>
                Enter your new password. Make sure it's strong
                and secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleResetPassword}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      required
                      className="bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#2C3E50]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      required
                      className="bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#2C3E50]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#ECF0F1] p-3 rounded-lg">
                  <p className="text-xs text-[#34495E]">
                    <strong>Password requirements:</strong>
                  </p>
                  <ul className="text-xs text-[#34495E] mt-1 space-y-1">
                    <li
                      className={
                        newPassword.length >= 6
                          ? "text-[#2ECC71]"
                          : ""
                      }
                    >
                      • At least 6 characters long
                    </li>
                    <li
                      className={
                        newPassword === confirmPassword &&
                        newPassword !== ""
                          ? "text-[#2ECC71]"
                          : ""
                      }
                    >
                      • Passwords match
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
                >
                  Reset Password
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="text-sm text-[#2C3E50] hover:text-[#F39C12] inline-flex items-center gap-1"
                    onClick={() => onNavigate("login")}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}