import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingDetails, Bike } from '../types/booking';

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
  bookingReference: string | null;
  setBookingReference: React.Dispatch<React.SetStateAction<string | null>>;
  updateStartDate: (date: Date) => void;
  updateEndDate: (date: Date) => void;
  updateStartTime: (time: string) => void;
  updateEndTime: (time: string) => void;
  selectBike: (bike: Bike) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingDetails: BookingDetails = {
  startDate: null,
  endDate: null,
  startTime: '7:00 AM',
  endTime: '7:00 AM',
  selectedBike: null,
  calculatedRate: 0,
  durationHours: 0,
  securityDeposit: 0,
  finalTotal: 0,
  bookingStatus: null,
  paymentStatus: null,
  packageDays: null,
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingDetails);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const updateStartDate = (date: Date) => {
    setBookingDetails((prev) => ({ ...prev, startDate: date }));
  };

  const updateEndDate = (date: Date) => {
    setBookingDetails((prev) => ({ ...prev, endDate: date }));
  };

  const updateStartTime = (time: string) => {
    setBookingDetails((prev) => ({ ...prev, startTime: time }));
  };

  const updateEndTime = (time: string) => {
    setBookingDetails((prev) => ({ ...prev, endTime: time }));
  };

  const selectBike = (bike: Bike) => {
    setBookingDetails((prev) => ({ ...prev, selectedBike: bike }));
  };

  const clearBooking = () => {
    setBookingDetails(initialBookingDetails);
    setBookingReference(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        bookingReference,
        setBookingReference,
        updateStartDate,
        updateEndDate,
        updateStartTime,
        updateEndTime,
        selectBike,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
