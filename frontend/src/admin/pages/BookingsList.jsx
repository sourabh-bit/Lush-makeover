import React from 'react';
import RecordList from '../components/RecordList';

const BookingsList = () => (
  <RecordList
    title="Bookings"
    subtitle="Appointment requests from your website."
    fetchPath="/api/admin/bookings"
    patchPath="/api/admin/bookings"
    emptyText="No bookings yet — they'll appear here when brides book through your website."
    primary={(b) => b.customer}
    secondary={(b) => b.service}
    meta={(b) => (b.date ? `${b.date}${b.time ? ` at ${b.time}` : ''}` : '')}
    statusOf={(b) => b.status}
    statusActions={[
      { status: 'confirmed', label: 'Confirm booking', style: 'bg-emerald-600 text-white' },
      { status: 'cancelled', label: 'Cancel booking', style: 'border border-red-200 text-red-600' },
    ]}
  />
);

export default BookingsList;
