type SearchParams = Record<string, string | string[] | undefined>

/**
 * Interface representing the properties for a component with search params.
 * @template P - The type of the search params.
 * @template Q - The type of the other properties.
 */
export type PropsWithSearchParams<P = SearchParams, Q = unknown> = Q & {
  searchParams: Promise<P>
}
