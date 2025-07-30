import type { Page } from '@/lib/graphql'

import type { DrawingDiscipline } from './review-drawing.types'

/**
 * Extracts the starting alphabetic characters from a string.
 * @param {string} str - The string to extract from.
 * @returns {string|null} The extracted alphabets or null if none found.
 */
const extractStartingAlphabets = (str: string): string => {
  const match = /^[A-Za-z]+/.exec(str)
  return match == null ? '' : match[0]
}

export const getDrawingDisciplines = (pages: Page[]): DrawingDiscipline[] => {
  return pages
    .filter((page, index, self) => {
      if (page.drawing_discipline == null) return false
      return (
        self.findIndex(
          p => p.drawing_discipline === page.drawing_discipline
        ) === index
      )
    })
    .map(page => ({
      id: page.page_id,
      code: extractStartingAlphabets(page.drawing_number ?? ''),
      discipline: page.drawing_discipline ?? ''
    }))
}
