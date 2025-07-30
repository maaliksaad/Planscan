export const extractDrawingPrefix = (drawingNumber: string): string | null => {
  drawingNumber = drawingNumber.toUpperCase()
  const match = /^([A-Z]+)/.exec(drawingNumber)
  return match == null ? null : match[1]
}
