import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner@2.0.3";

interface HealthReportsPageProps {
  onBack: () => void;
}

const mockReports = [
  {
    id: 1,
    name: "Full Body Checkup Report",
    date: "2025-10-28",
    type: "Blood Test",
    doctor: "Dr. Sharma",
    uploadedBy: "NutriScan Health Lab",
    bookingId: "BK-1001",
  },
  {
    id: 2,
    name: "ECG Report",
    date: "2025-10-15",
    type: "Cardiac",
    doctor: "Dr. Patel",
    uploadedBy: "NutriScan Health Lab",
    bookingId: "BK-1002",
  },
  {
    id: 3,
    name: "X-Ray Report",
    date: "2025-09-22",
    type: "Radiology",
    doctor: "Dr. Kumar",
    uploadedBy: "NutriScan Health Lab",
    bookingId: "BK-1003",
  },
];

export function HealthReportsPage({
  onBack,
}: HealthReportsPageProps) {
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedReport, setSelectedReport] =
    useState<any>(null);

  const handleView = (report: any) => {
    setSelectedReport(report);
    setShowViewDialog(true);
  };

  const handleDownload = (report: any) => {
    toast.success(`Downloading ${report.name}...`);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Health Reports</h1>
            <p className="text-muted-foreground">
              View your medical reports uploaded by healthcare
              providers
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {mockReports.map((report) => (
            <Card key={report.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#2ECC71]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{report.name}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                        <span>
                          Date:{" "}
                          {new Date(
                            report.date,
                          ).toLocaleDateString("en-IN")}
                        </span>
                        <span>•</span>
                        <span>Doctor: {report.doctor}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                        <span>
                          Booking ID: {report.bookingId}
                        </span>
                        <span>•</span>
                        <span>
                          Uploaded by: {report.uploadedBy}
                        </span>
                      </div>
                      <Badge className="bg-[#2C3E50] hover:bg-[#2C3E50]/90">
                        {report.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleView(report)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockReports.length === 0 && (
          <Card className="bg-white">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground">
                Your health reports will appear here once
                uploaded by your healthcare provider.
              </p>
            </CardContent>
          </Card>
        )}

        {/* View Dialog */}
        <Dialog
          open={showViewDialog}
          onOpenChange={setShowViewDialog}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedReport?.name}</DialogTitle>
              <DialogDescription>
                {selectedReport?.type} •{" "}
                {selectedReport &&
                  new Date(
                    selectedReport.date,
                  ).toLocaleDateString("en-IN")}{" "}
                • Dr. {selectedReport?.doctor}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                <div>
                  <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Report Preview
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF viewer would display here
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDownload(selectedReport)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                type="button"
                onClick={() => setShowViewDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}