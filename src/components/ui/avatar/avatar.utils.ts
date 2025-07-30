export const computeInitials = (name: string): string => {
  const [firstName, lastName] = name.split(' ')
  return `${firstName[0]}${lastName[0]}`
}
