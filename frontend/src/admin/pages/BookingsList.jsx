import React from 'react';
import RecordList from '../components/RecordList';

const categoryTags = {
  wedding: { label: 'Wedding', style: 'bg-[#f3e7d3] text-[#8a6a3b]' },
  academy: { label: 'Academy', style: 'bg-[#e4ecf7] text-[#3b5e8a]' },
};

const BookingsList = () => (
  <RecordList
    title="Bookings"
    subtitle="Wedding enquiries, academy requests and appointments from your website."
    fetchPath="/api/admin/bookings"
    patchPath="/api/admin/bookings"
    emptyText="No bookings yet — they'll appear here when brides book through your website."
    primary={(b) => b.customer}
    secondary={(b) => b.service}
    meta={(b) => (b.date ? `${b.date}${b.time ? ` at ${b.time}` : ''}` : '')}
    statusOf={(b) => b.status}
    tag={(b) => categoryTags[b.category] || categoryTags.wedding}
    filterTabs={[
      { key: 'all', label: 'All', filter: () => true },
      { key: 'wedding', label: 'Weddings', filter: (b) => (b.category || 'wedding') === 'wedding' },
      { key: 'academy', label: 'Academy', filter: (b) => b.category === 'academy' },
    ]}
    statusActions={[
      { status: 'confirmed', label: 'Confirm booking', style: 'bg-emerald-600 text-white' },
      { status: 'cancelled', label: 'Cancel booking', style: 'border border-red-200 text-red-600' },
    ]}
  />
);

export default BookingsList;
