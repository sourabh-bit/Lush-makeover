import React from 'react';

const OptimizedImage = ({
  priority = false,
  loading,
  decoding = 'async',
  fetchPriority,
  className = '',
  ...props
}) => {
  const finalLoading = loading || (priority ? 'eager' : 'lazy');
  const finalFetchPriority =
    fetchPriority || (priority || finalLoading === 'eager' ? 'high' : 'auto');

  return (
    <img
      loading={finalLoading}
      decoding={decoding}
      fetchPriority={finalFetchPriority}
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;
