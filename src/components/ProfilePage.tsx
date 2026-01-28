import { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner@2.0.3";

interface ProfilePageProps {
  user: any;
  onBack: () => void;
  onUpdate: (userData: any) => void;
}

export function ProfilePage({
  user,
  onBack,
  onUpdate,
}: ProfilePageProps) {
  const [showPasswordDialog, setShowPasswordDialog] =
    useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [emailNotifications, setEmailNotifications] =
    useState(true);
  const [smsNotifications, setSmsNotifications] =
    useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, email, phone, address });
  };

  const handleChangePassword = () => {
    toast.success("Password changed successfully!");
    setShowPasswordDialog(false);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="mb-8">Profile Settings</h1>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    className="bg-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="mb-1">Account Type</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowPasswordDialog(true)}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p>Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive booking updates via email
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailNotifications(!emailNotifications);
                    toast.success(
                      `Email notifications ${!emailNotifications ? "enabled" : "disabled"}!`,
                    );
                  }}
                  className={
                    emailNotifications
                      ? "bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90"
                      : ""
                  }
                >
                  {emailNotifications ? "Enabled" : "Enable"}
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p>SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive appointment reminders via SMS
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSmsNotifications(!smsNotifications);
                    toast.success(
                      `SMS notifications ${!smsNotifications ? "enabled" : "disabled"}!`,
                    );
                  }}
                  className={
                    smsNotifications
                      ? "bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90"
                      : ""
                  }
                >
                  {smsNotifications ? "Enabled" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password and confirm it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
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
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#F39C12] hover:bg-[#F39C12]/90"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}