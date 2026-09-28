export interface Bike {
  id: string;
  name: string;
  image: string;
  features: string[];
  baseRatePerHour: number;
  baseRate12Hours: number;
  baseRate24Hours: number;
  category: 'scooter' | 'motorcycle' | 'electric';
  available?: boolean;
  // Package pricing (0 = not available)
  price1Day?: number;
  price2Days?: number;
  price3Days?: number;
  price7Days?: number;
}

export interface PackageOption {
  days: number;
  price: number;
  label: string;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

export interface BookingDetails {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  selectedBike: Bike | null;
  calculatedRate: number;
  durationHours: number;
  securityDeposit: number;
  finalTotal: number;
  bookingStatus: string | null;
  paymentStatus: string | null;
  packageDays: number | null; // null = custom dates
}

export interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  idProof: string;
  idProofFile: File | null;
}
