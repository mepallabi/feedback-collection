/**
 * Validate submitter information
 * @param {Object} submitterInfo - The submitter information object
 * @returns {string|null} Error message if validation fails, null if passes
 */
export const validateSubmitterInfo = (submitterInfo) => {
  if (!submitterInfo.name.trim()) {
    return 'Please provide your name.';
  }
  if (!submitterInfo.designation.trim()) {
    return 'Please provide your designation/role.';
  }
  return null;
};

/**
 * Validate feedback data
 * @param {Object} feedback - The feedback data object
 * @returns {string|null} Error message if validation fails, null if passes
 */
export const validateFeedback = (feedback) => {
  const hasRatings = Object.values(feedback).some(area => area.rating > 0);
  if (!hasRatings) {
    return 'Please provide at least one rating before submitting.';
  }
  return null;
}; 