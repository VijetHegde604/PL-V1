# Parents Luxuria - Premium Senior Wellness Platform

**Tagline:** Because They Deserve the Best Care in Their Golden Years

A comprehensive senior wellness web application built with React.js, Vite, and Tailwind CSS v4.

## 🎯 Overview

Parents Luxuria is a premium senior wellness platform offering 6 core modules:

- **CareNest** - Home Nursing Services
- **NutriScan** - Health Checkups & Diagnostics
- **MealAura** - Meal Planning & Nutrition
- **RejuvaFit** - Fitness & Physical Therapy
- **BlissTouch** - Grooming & Personal Care
- **SilverCircle** - Community Events & Social Activities

## 🎨 Design System

### Brand Colors

- **Primary:** #2C3E50 (Dark Slate)
- **Secondary:** #2ECC71 (Emerald Green)
- **Accent:** #F39C12 (Orange)
- **Neutral:** #ECF0F1 (Light Gray)
- **Text:** #34495E (Charcoal)

### Typography

- **Font:** Inter (optimized for accessibility)
- **Base Size:** 18px (enhanced for senior users)

## 🚀 Tech Stack

- **Framework:** React 18.3+
- **Build Tool:** Vite 5.2+
- **Styling:** Tailwind CSS v4.0
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Language:** TypeScript

## 📦 Project Structure

```
/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── common/         # Common components
│   └── figma/          # Figma imported components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── styles/             # Global styles
├── types/              # TypeScript types
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 👥 User Roles

1. **Parents/Families** - Book services and manage appointments
2. **Service Partners** - Fulfill bookings (CareNest, NutriScan, MealAura, RejuvaFit, BlissTouch)
3. **Admin** - Platform management and oversight

## ✨ Key Features

### For Senior Users

- Large, readable fonts (18px base)
- High contrast design (WCAG 2.1 AA compliant)
- Simple, intuitive navigation
- Mobile-first responsive design
- Touch-friendly interface (44px minimum touch targets)

### Technical Features

- **Code Splitting:** Lazy loading for optimal performance
- **Optimized Images:** Unsplash integration with WebP support
- **Motion Animations:** Smooth, accessible animations
- **State Management:** Custom hooks (useAuth, useBookings)
- **Responsive Design:** Mobile-first approach
- **Production Ready:** Minification, tree-shaking, and optimization

## 🎯 Performance Optimizations

- Lazy loading of route components
- Image optimization and lazy loading
- CSS-in-JS with Tailwind CSS v4
- Bundle splitting (vendor, UI components, motion)
- Asset inlining for small files (< 4kb)
- Remove console logs in production
- Efficient re-renders with React.memo

## 🔒 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_APP_NAME=Parents Luxuria
VITE_ENV=development
```

## 📱 Responsive Breakpoints

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

## 🎨 Tailwind CSS v4

This project uses Tailwind CSS v4 with:

- Custom design tokens in `/styles/globals.css`
- Dark mode support
- Custom animations
- Brand color integration

## 🧪 Build Configuration

### Vite Configuration

- Terser minification with console removal
- Manual chunk splitting for optimal loading
- Asset optimization (< 4kb inlined)
- Source maps disabled in production

### TypeScript Configuration

- Strict mode enabled
- ES2020 target
- Bundler module resolution
- No unused locals/parameters

## 📄 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

This is a production application. Follow these guidelines:

1. Write clean, readable code
2. Use TypeScript for type safety
3. Follow the existing code style
4. Test responsiveness on mobile devices
5. Ensure accessibility compliance

## 📝 License

Proprietary - Parents Luxuria

## 🔗 Links

- **Production URL:** [To be deployed]
- **Documentation:** See inline code comments
- **Design System:** See `/constants/design.ts`

---

**Built with ❤️ for Senior Wellness**