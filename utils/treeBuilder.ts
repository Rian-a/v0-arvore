import type { TreeNode, Location, Character } from "@/types/tree"

export function buildTree(
  locations: Location[],
  charactersByLocation: Map<number, Character[]>
): TreeNode {
  const root: TreeNode = {
    id: "root",
    valor: "Locations",
    filhos: [],
    pai: null,
  }

  for (const location of locations) {
    const locationNode: TreeNode = {
      id: `location-${location.id}`,
      valor: location.name,
      filhos: [],
      pai: "root",
    }

    const characters = charactersByLocation.get(location.id) || []

    for (const character of characters) {
      const characterNode: TreeNode = {
        id: `character-${character.id}`,
        valor: character.name,
        filhos: [],
        pai: `location-${location.id}`,
      }
      locationNode.filhos.push(characterNode)
    }

    root.filhos.push(locationNode)
  }

  return root
}
