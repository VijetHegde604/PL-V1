import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const ServiceCard = memo(function ServiceCard({
  title,
  description,
  icon: Icon,
  onClick,
}: ServiceCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white h-full w-full"
      onClick={onClick}
    >
      <CardHeader>
        <div className="w-16 h-16 bg-gradient-to-br from-[#2C3E50] to-[#2ECC71] rounded-full flex items-center justify-center mb-4 mx-auto">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-center text-[#2C3E50]">
          {title}
        </CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
});