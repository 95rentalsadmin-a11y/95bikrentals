import { Bike, PackageOption } from '../types/booking';
import shine from '../assets/images/shine_100.jpg';
import Activa from '../assets/images/activa_6g.png';
import fascino from '../assets/images/fascino.jpeg';
import Destini from '../assets/images/destini.jpeg';
import Aether from '../assets/images/aether.jpeg';

export const bikeImages: Record<string, string> = {
  '1': shine,
  '2': Activa,
  '3': fascino,
  '4': Destini,
  '5': Aether,
};

const API_HOST = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

export const getBikeImage = (id: string, fallback?: string): string => {
  if (bikeImages[id]) return bikeImages[id];
  // Server-hosted images (R2 via backend stream, or legacy /uploads paths)
  if (fallback && (fallback.startsWith('/api/') || fallback.startsWith('/uploads/'))) {
    return `${API_HOST}${fallback}`;
  }
  return fallback || shine;
};

export const bikesData: Bike[] = [
  {
    id: '1',
    name: 'Honda Shine 100 BS6',
    image: shine,
    features: ['100cc Engine', 'Fuel Efficient', 'Comfortable Ride', 'Disc Brake'],
    baseRatePerHour: 50,
    baseRate12Hours: 425,
    baseRate24Hours: 580,
    category: 'motorcycle',
    price1Day: 580,
    price2Days: 1160,
    price3Days: 1740,
    price7Days: 3333,
  },
  {
    id: '2',
    name: 'Honda Activa BS6',
    image: Activa,
    features: ['110cc Engine', 'Automatic', 'Storage Space', 'Telescopic Suspension'],
    baseRatePerHour: 50,
    baseRate12Hours: 425,
    baseRate24Hours: 580,
    category: 'scooter',
    price1Day: 580,
    price2Days: 1160,
    price3Days: 1740,
    price7Days: 3333,
  },
  {
    id: '3',
    name: 'Yamaha Fascino BS6',
    image: fascino,
    features: ['125cc Engine', 'Stylish Design', 'Lightweight', 'USB Charging'],
    baseRatePerHour: 50,
    baseRate12Hours: 425,
    baseRate24Hours: 580,
    category: 'scooter',
    price1Day: 580,
    price2Days: 1160,
    price3Days: 1740,
    price7Days: 3333,
  },
  {
    id: '4',
    name: 'Hero Destini BS6 Xtec',
    image: Destini,
    features: ['125cc Engine', 'Digital Console', 'Mobile Charging', 'External Fuel Fill'],
    baseRatePerHour: 50,
    baseRate12Hours: 425,
    baseRate24Hours: 580,
    category: 'scooter',
    price1Day: 580,
    price2Days: 1160,
    price3Days: 1740,
    price7Days: 3333,
  },
  {
    id: '5',
    name: 'Aether 450X',
    image: Aether,
    features: ['Electric', 'Fast Charging', 'Zero Emissions', 'Smart Connectivity'],
    baseRatePerHour: 75,
    baseRate12Hours: 600,
    baseRate24Hours: 800,
    category: 'electric',
    price1Day: 800,
    price2Days: 1600,
    price3Days: 2400,
    price7Days: 4800,
  },
];

export const calculateRate = (bike: Bike, durationHours: number): number => {
  if (durationHours <= 12) {
    return bike.baseRate12Hours;
  } else if (durationHours <= 24) {
    return bike.baseRate24Hours;
  } else {
    const fullDays = Math.floor(durationHours / 24);
    const remainingHours = durationHours - fullDays * 24;
    const base = bike.baseRate24Hours * fullDays;
    const extra = remainingHours > 0
      ? Math.min(remainingHours * bike.baseRatePerHour, bike.baseRate24Hours)
      : 0;
    return base + extra;
  }
};

// Get available packages for a bike (price > 0)
export const getAvailablePackages = (bike: Bike): PackageOption[] => {
  const packages: PackageOption[] = [];
  if (bike.price1Day && bike.price1Day > 0) packages.push({ days: 1, price: bike.price1Day, label: '1 Day' });
  if (bike.price2Days && bike.price2Days > 0) packages.push({ days: 2, price: bike.price2Days, label: '2 Days' });
  if (bike.price3Days && bike.price3Days > 0) packages.push({ days: 3, price: bike.price3Days, label: '3 Days' });
  if (bike.price7Days && bike.price7Days > 0) packages.push({ days: 7, price: bike.price7Days, label: '7 Days' });
  return packages;
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour <= 22; hour++) {
    slots.push({
      hour,
      minute: 0,
      label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
    });
    if (hour < 22) {
      slots.push({
        hour,
        minute: 30,
        label: `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`,
      });
    }
  }
  return slots;
};
