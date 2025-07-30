import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

/**
 * Custom classnames function that merges tailwind classes
 * @param inputs - classNames arguments
 * @returns {string} - merged tailwind classes
 * @example cn({ 'text-red-500': true, 'text-blue-500': false }) // 'text-red-500' if true, else 'text-blue-500'
 */
export const cn = (...inputs: classNames.ArgumentArray): string => {
  return twMerge(classNames(inputs))
}
