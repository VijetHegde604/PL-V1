// Shared TypeScript types and interfaces

export type UserRole = "parent" | "partner" | "admin";

export type ServiceType =
  | "CareNest"
  | "NutriScan"
  | "MealAura"
  | "RejuvaFit"
  | "BlissTouch";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  serviceType?: ServiceType;
  status?: string;
  joinDate?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

export interface Appointment {
  service: string;
  date: string;
  time: string;
  price: string;
  status: "upcoming" | "completed" | "cancelled";
  module?: string;    // Service module (CareNest, NutriScan, etc.)
  partner?: string;   // Service provider name
}

export interface Booking {
  id: number;
  service: string;
  clientName: string;
  date: string;
  time: string;
  address: string;
  phone: string;
  price: string;
  status?: "Pending" | "Confirmed" | "Cancelled";
}

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  description: string;
  status?: string;
  imageUrl: string;
}

export interface Service {
  id: number;
  name: string;
  module: string;
  price: string;
  active: boolean;
  description?: string;
  duration?: string;
}