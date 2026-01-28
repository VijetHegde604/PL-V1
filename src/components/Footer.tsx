import { Heart } from "lucide-react";
import { memo, useCallback } from "react";
import { ROUTES } from "../constants/routes";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer = memo(function Footer({
  onNavigate,
}: FooterProps) {
  const handleLinkClick = useCallback(
    (e: React.MouseEvent, page: string) => {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(page);
      }
    },
    [onNavigate],
  );

  return (
    <footer className="bg-[#2C3E50] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart
                className="w-6 h-6 text-[#F39C12]"
                fill="#F39C12"
              />
              <span>Parents Luxuria</span>
            </div>
            <p className="text-white/80">
              Premium Senior Wellness & Lifestyle Care
            </p>
            <p className="text-white/60 text-sm mt-2">
              Because They Deserve the Best Care in Their Golden
              Years
            </p>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.ABOUT)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.SERVICES)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.CONTACT)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.PRIVACY)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.TERMS)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={(e) =>
                    handleLinkClick(e, ROUTES.REFUND)
                  }
                  className="hover:text-[#F39C12] transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-white/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Parents Luxuria.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});