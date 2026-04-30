export interface TreeNode {
  id: string
  valor: string
  filhos: TreeNode[]
  pai: string | null
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ApiResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

export type TraversalType = "pre-order" | "in-order" | "post-order"
