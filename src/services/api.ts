import { Bike } from '../types/booking';

const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:5001/api` : 'http://localhost:5000/api');

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('customerToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.error) message = errorBody.error;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export interface BookingPayload {
  bikeId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  idProof: string;
  idProofFilePath: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  paymentMethod: 'razorpay' | 'whatsapp' | 'cash';
  accessories?: { accessoryId: string; quantity: number }[];
  couponCode?: string;
  packageDays?: number | null;
}

export interface CreateBookingResponse {
  id: string;
  message: string;
  status: string;
  calculatedRate: number;
  securityDeposit: number;
  durationHours: number;
}

export interface AvailabilityResponse {
  bikeId: string;
  available: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityAllResponse {
  availability: Record<string, boolean>;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface RateResponse {
  bikeId: string;
  durationHours: number;
  calculatedRate: number;
  securityDeposit: number;
  breakdown: {
    baseRate: number;
    extraHours: number;
    extraHourlyRate: number;
    extraCharge: number;
    rentalTotal: number;
    gstRate: number;
    gstAmount: number;
    accessoriesTotal: number;
    accessories: { id: string; name: string; quantity: number; lineTotal: number }[];
    discountAmount: number;
    coupon: { code: string; discountType: string; discountValue: number } | null;
    taxableAmount: number;
    total: number;
  };
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  available: boolean;
}

export interface CouponValidationResponse {
  valid: boolean;
  couponId: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  discountAmount: number;
  finalAmount: number;
}

export interface MyBooking {
  id: string;
  bikeId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  idProof: string;
  idProofFilePath?: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  calculatedRate: number;
  durationHours: number;
  securityDeposit: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'cash' | 'whatsapp';
  paymentMethod?: string | null;
  createdAt: string;
  bike?: { id: string; name: string; image: string };
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  bookingId: string;
  keyId: string;
}

export interface RazorpayVerifyResponse {
  message: string;
  bookingId: string;
  status: string;
  paymentStatus: string;
}

// Bikes
export const getBikes = () => request<Bike[]>('/bikes');

export const getBikeById = (id: string) => request<Bike>(`/bikes/${id}`);

// ID-proof upload (multipart, returns R2 URL)
export const uploadIdProof = (file: File): Promise<{ key: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`${API_BASE_URL}/uploads/id-proof`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed: ${res.status}`);
    }
    return res.json();
  });
};

// Bookings
export const createBooking = (payload: BookingPayload) =>
  request<CreateBookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getMyBookings = () => request<MyBooking[]>('/bookings/me');

export const getBookingById = (id: string) => request<MyBooking>(`/bookings/${id}`);

export const cancelBooking = (id: string) =>
  request<{ message: string; booking: MyBooking }>(`/bookings/${id}/cancel`, {
    method: 'PATCH',
  });

export const checkAvailability = (
  bikeId: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
) =>
  request<AvailabilityResponse>('/bookings/check-availability', {
    method: 'POST',
    body: JSON.stringify({ bikeId, startDate, endDate, startTime, endTime }),
  });

export const checkAvailabilityAll = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
) =>
  request<AvailabilityAllResponse>('/bookings/check-availability-all', {
    method: 'POST',
    body: JSON.stringify({ startDate, endDate, startTime, endTime }),
  });

export const calculateRateApi = (
  bikeId: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  accessories?: { accessoryId: string; quantity: number }[],
  couponCode?: string,
  packageDays?: number | null
) =>
  request<RateResponse>('/bookings/calculate-rate', {
    method: 'POST',
    body: JSON.stringify({ bikeId, startDate, endDate, startTime, endTime, accessories, couponCode, packageDays }),
  });

// Accessories (public)
export const getAvailableAccessories = () =>
  request<Accessory[]>('/catalog/accessories');

// Coupon validation
export const validateCoupon = (code: string, orderAmount: number) =>
  request<CouponValidationResponse>('/catalog/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code, orderAmount }),
  });

// Customer auth (Firebase Phone Auth)
export const verifyCustomerToken = (idToken: string, mobile: string) =>
  request<{ token: string; user: { id: string; mobile: string; role: string } }>('/auth/verify-token', {
    method: 'POST',
    body: JSON.stringify({ idToken, mobile }),
  });

// Razorpay
export const createRazorpayOrder = (bookingId: string) =>
  request<RazorpayOrderResponse>('/payments/razorpay/order', {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
  });

export const verifyRazorpayPayment = (
  bookingId: string,
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) =>
  request<RazorpayVerifyResponse>('/payments/razorpay/verify', {
    method: 'POST',
    body: JSON.stringify({
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    }),
  });
