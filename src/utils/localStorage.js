// src/utils/localStorage.js
// Utility functions for working with localStorage

/**
 * Gets an item from localStorage and parses JSON
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The parsed value or defaultValue
 */
export const getStoredItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error("Error getting item from localStorage:", error)
    return defaultValue
  }
}

/**
 * Stores an item in localStorage after stringifying
 * @param {string} key - The key to store under
 * @param {any} value - The value to store
 * @returns {boolean} Success or failure
 */
export const storeItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error("Error storing item in localStorage:", error)
    return false
  }
}

/**
 * Removes an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} Success or failure
 */
export const removeStoredItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing item from localStorage:", error)
    return false
  }
}

/**
 * Clears all app data from localStorage
 * @returns {boolean} Success or failure
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem("tasks")
    localStorage.removeItem("categories")
    // Keep theme preference
    return true
  } catch (error) {
    console.error("Error clearing data from localStorage:", error)
    return false
  }
}
