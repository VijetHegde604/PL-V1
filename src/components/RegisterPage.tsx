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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Heart } from "lucide-react";

interface RegisterPageProps {
  onRegister: (
    name: string,
    email: string,
    password: string,
    role: "parent" | "partner",
  ) => void;
  onNavigate: (page: string) => void;
}

export function RegisterPage({
  onRegister,
  onNavigate,
}: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"parent" | "partner">(
    "parent",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onRegister(name, email, password, role);
  };

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
            Create your account to get started.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Fill in your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-3">
                <Label>I am registering as:</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as "parent" | "partner")
                  }
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg bg-white">
                    <RadioGroupItem
                      value="parent"
                      id="parent"
                    />
                    <Label
                      htmlFor="parent"
                      className="cursor-pointer flex-1"
                    >
                      <div>
                        <p>Parent/Family Member</p>
                        <p className="text-sm text-muted-foreground">
                          Booking services for family or myself
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg bg-white">
                    <RadioGroupItem
                      value="partner"
                      id="partner"
                    />
                    <Label
                      htmlFor="partner"
                      className="cursor-pointer flex-1"
                    >
                      <div>
                        <p>Service Provider/Partner</p>
                        <p className="text-sm text-muted-foreground">
                          Offering wellness services
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F39C12] hover:bg-[#F39C12]/90"
              >
                Register
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-[#2C3E50] hover:text-[#F39C12]"
                    onClick={() => onNavigate("login")}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}