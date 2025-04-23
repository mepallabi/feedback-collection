/**
 * Format a date string to a localized date and time string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};

/**
 * Format a timestamp to a readable date string
 * @param {number|Date} timestamp - Timestamp or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago")
 * @param {number|Date} timestamp - Timestamp or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = (timestamp) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, 'year');
}; 