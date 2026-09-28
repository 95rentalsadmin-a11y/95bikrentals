import React from 'react';
import { generateTimeSlots } from '../../utils/bikeData';

interface DateTimePickerProps {
  label: string;
  date: Date | null;
  onDateChange: (date: Date) => void;
  time: string;
  onTimeChange: (time: string) => void;
  minDate?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  date,
  onDateChange,
  time,
  onTimeChange,
  minDate,
}) => {
  const timeSlots = generateTimeSlots();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    onDateChange(selectedDate);
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-Inter font-semibold text-gray-700">{label}</label>
      <div className="flex gap-4">
        <input
          type="date"
          value={formatDateForInput(date)}
          onChange={handleDateChange}
          min={minDate ? formatDateForInput(minDate) : undefined}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-blue focus:outline-none font-Inter transition-all"
        />
        <select
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-blue focus:outline-none font-Inter transition-all"
        >
          {timeSlots.map((slot) => (
            <option key={`${slot.hour}-${slot.minute}`} value={slot.label}>
              {slot.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateTimePicker;
