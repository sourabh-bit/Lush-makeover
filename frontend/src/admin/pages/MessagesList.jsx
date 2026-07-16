import React from 'react';
import RecordList from '../components/RecordList';

const categoryTags = {
  wedding: { label: 'Wedding', style: 'bg-[#f3e7d3] text-[#8a6a3b]' },
  academy: { label: 'Academy', style: 'bg-[#e4ecf7] text-[#3b5e8a]' },
  general: { label: 'Message', style: 'bg-[#f4efe8] text-[#6b6257]' },
};

const MessagesList = () => (
  <RecordList
    title="Messages"
    subtitle="Wedding enquiries, academy requests and quick messages."
    fetchPath="/api/admin/messages"
    patchPath="/api/admin/messages"
    deletePath="/api/admin/messages"
    emptyText="Nothing here yet — enquiries from your website will appear here."
    primary={(m) => m.name}
    secondary={(m) => m.message}
    statusOf={(m) => m.status}
    tag={(m) => categoryTags[m.category] || categoryTags.general}
    filterTabs={[
      { key: 'all', label: 'All', filter: () => true },
      { key: 'wedding', label: 'Weddings', filter: (m) => m.category === 'wedding' },
      { key: 'academy', label: 'Academy', filter: (m) => m.category === 'academy' },
      { key: 'general', label: 'Other', filter: (m) => !m.category || m.category === 'general' },
    ]}
    statusActions={[
      { status: 'read', label: 'Mark as read', style: 'bg-[#1f1f1f] text-white' },
      { status: 'unread', label: 'Mark as new', style: 'border border-black/10 bg-white text-[#4b453f]' },
    ]}
  />
);

export default MessagesList;
