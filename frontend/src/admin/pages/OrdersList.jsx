import React from 'react';
import RecordList from '../components/RecordList';

const OrdersList = () => (
  <RecordList
    title="Orders"
    subtitle="Payments and packages."
    fetchPath="/api/admin/orders"
    emptyText="No orders yet — they'll appear here once you record a payment."
    primary={(o) => o.client_name}
    secondary={(o) => o.package_purchased}
    meta={(o) => o.amount}
    statusOf={(o) => o.status}
  />
);

export default OrdersList;
