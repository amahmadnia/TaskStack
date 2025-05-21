// src/utils/dateUtils.js
// Utility functions for date handling

/**
 * Format a date as YYYY-MM-DD (for input[type="date"])
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDateForInput = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split("T")[0]
}

/**
 * Format a date in a user-friendly way
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d)
}

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const today = new Date()
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPast = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

/**
 * Check if a date is within the next 7 days
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is within the next 7 days
 */
export const isUpcoming = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  return d >= today && d <= nextWeek
}

/**
 * Get relative time description (e.g., "2 days ago", "in 3 days")
 * @param {Date|string} date - Date to describe
 * @returns {string} Relative time description
 */
export const getRelativeTime = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const now = new Date()
  const diffTime = d - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
  return `In ${diffDays} days`
}
