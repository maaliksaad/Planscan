export const areArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false
  }

  return arr1.every(item1 => arr2.includes(item1))
}
