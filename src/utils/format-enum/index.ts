/**
 * Format enum value to human readable string
 * @param value {string} - enum value
 * @returns {string} - formatted enum value (_ replaced with space and first letter capitalized)
 */
export const formatEnum = (value: string): string => {
  return value
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/^./, c => c.toUpperCase())
}
