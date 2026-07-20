import React from 'react';
import RecordList from '../components/RecordList';

const MessagesList = () => (
  <RecordList
    title="Messages"
    subtitle="Quick messages from your website's contact form."
    fetchPath="/api/admin/messages"
    patchPath="/api/admin/messages"
    deletePath="/api/admin/messages"
    emptyText="Nothing here yet — quick messages from your website will appear here."
    primary={(m) => m.name}
    secondary={(m) => m.message}
    statusOf={(m) => m.status}
    statusActions={[
      { status: 'read', label: 'Mark as read', style: 'bg-[#1f1f1f] text-white' },
      { status: 'unread', label: 'Mark as new', style: 'border border-black/10 bg-white text-[#4b453f]' },
    ]}
  />
);

export default MessagesList;
