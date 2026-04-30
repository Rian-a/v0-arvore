import type { ApiResponse, Location, Character } from "@/types/tree"

const BASE_URL = "https://rickandmortyapi.com/api"

export async function fetchAllLocations(): Promise<Location[]> {
  const allLocations: Location[] = []
  let nextUrl: string | null = `${BASE_URL}/location`

  while (nextUrl) {
    const response = await fetch(nextUrl)
    const data: ApiResponse<Location> = await response.json()
    allLocations.push(...data.results)
    nextUrl = data.info.next
  }

  return allLocations
}

export async function fetchCharactersByUrls(urls: string[]): Promise<Character[]> {
  if (urls.length === 0) return []

  // Extrair IDs das URLs
  const ids = urls.map((url) => {
    const parts = url.split("/")
    return parts[parts.length - 1]
  })

  // API aceita múltiplos IDs separados por vírgula
  const response = await fetch(`${BASE_URL}/character/${ids.join(",")}`)
  const data = await response.json()

  // Se for apenas um personagem, a API retorna objeto, não array
  return Array.isArray(data) ? data : [data]
}

export async function fetchAllData(): Promise<{
  locations: Location[]
  charactersByLocation: Map<number, Character[]>
}> {
  const locations = await fetchAllLocations()

  // Buscar todos os residents de cada location em paralelo
  const charactersByLocation = new Map<number, Character[]>()

  const locationPromises = locations.map(async (location) => {
    if (location.residents.length > 0) {
      const characters = await fetchCharactersByUrls(location.residents)
      charactersByLocation.set(location.id, characters)
    } else {
      charactersByLocation.set(location.id, [])
    }
  })

  await Promise.all(locationPromises)

  return { locations, charactersByLocation }
}
