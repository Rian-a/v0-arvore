"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TreeNode } from "@/types/tree"
import { getAllNodes, dfsPath } from "@/utils/treeAlgorithms"

interface SearchPanelProps {
  tree: TreeNode | null
  onHighlightPath: (nodeIds: string[]) => void
}

export function SearchPanel({ tree, onHighlightPath }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState<string[] | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = () => {
    if (!tree || !searchTerm.trim()) return

    setNotFound(false)
    setSearchResult(null)

    // Encontrar nó pelo valor
    const allNodes = getAllNodes(tree)
    const targetNode = allNodes.find(
      (node) => node.valor.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!targetNode) {
      setNotFound(true)
      onHighlightPath([])
      return
    }

    // Obter caminho usando DFS
    const path = dfsPath(tree, targetNode.id)
    if (path) {
      setSearchResult(path)
      // Destacar IDs no caminho
      const pathIds: string[] = []
      let currentNode: TreeNode | null = tree
      for (const valor of path) {
        if (currentNode) {
          const found = getAllNodes(currentNode).find((n) => n.valor === valor)
          if (found) pathIds.push(found.id)
        }
      }
      // Reconstruir IDs do caminho
      const nodeIds = allNodes
        .filter((node) => path.includes(node.valor))
        .map((node) => node.id)
      onHighlightPath(nodeIds)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResult(null)
    setNotFound(false)
    onHighlightPath([])
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Busca (DFS)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Buscar nó..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {notFound && (
          <p className="text-sm text-red-500">Nó não encontrado</p>
        )}

        {searchResult && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-700 mb-1 font-medium">Caminho encontrado:</p>
            <p className="text-sm text-amber-900">{searchResult.join(" → ")}</p>
          </div>
        )}

        {(searchResult || notFound) && (
          <Button variant="outline" size="sm" onClick={clearSearch}>
            Limpar busca
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
