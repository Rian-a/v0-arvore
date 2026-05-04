"use client"

import { useState } from "react"
import { Search, X, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TreeNode } from "@/types/tree"
import { getAllNodes, dfsPath } from "@/utils/treeAlgorithms"

interface SearchPanelProps {
  tree: TreeNode | null
  onHighlightPath: (nodeIds: string[]) => void
  onScrollToNode: (nodeId: string) => void
  onShowToast: (message: string, type: "success" | "error" | "warning" | "info") => void
}

export function SearchPanel({ tree, onHighlightPath, onScrollToNode, onShowToast }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState<string[] | null>(null)
  const [foundNodeId, setFoundNodeId] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = () => {
    if (!tree || !searchTerm.trim()) return

    setNotFound(false)
    setSearchResult(null)
    setFoundNodeId(null)

    // Encontrar nó pelo valor
    const allNodes = getAllNodes(tree)
    const targetNode = allNodes.find(
      (node) => node.valor.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!targetNode) {
      setNotFound(true)
      onHighlightPath([])
      onShowToast(`No "${searchTerm}" nao encontrado`, "error")
      return
    }

    // Obter caminho usando DFS
    const path = dfsPath(tree, targetNode.id)
    if (path) {
      setSearchResult(path)
      setFoundNodeId(targetNode.id)
      // Reconstruir IDs do caminho
      const nodeIds = allNodes
        .filter((node) => path.includes(node.valor))
        .map((node) => node.id)
      onHighlightPath(nodeIds)
      onScrollToNode(targetNode.id)
      onShowToast(`Encontrado: ${targetNode.valor}`, "info")
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResult(null)
    setFoundNodeId(null)
    setNotFound(false)
    onHighlightPath([])
  }

  return (
    <Card className="border-2">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-sky-500" />
          Busca (DFS)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Buscar no por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-2"
          />
          <Button onClick={handleSearch} size="icon" className="shrink-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {notFound && (
          <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-medium">
              No nao encontrado para: "{searchTerm}"
            </p>
          </div>
        )}

        {searchResult && (
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="h-4 w-4 text-amber-600" />
              <p className="text-sm text-amber-800 font-semibold">Caminho encontrado:</p>
            </div>
            <p className="text-sm text-amber-900 bg-white/50 p-2 rounded">
              {searchResult.join(" -> ")}
            </p>
            {foundNodeId && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 text-amber-700 border-amber-400 hover:bg-amber-100"
                onClick={() => onScrollToNode(foundNodeId)}
              >
                <Navigation className="h-4 w-4 mr-1" />
                Ir para o no
              </Button>
            )}
          </div>
        )}

        {(searchResult || notFound) && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearSearch}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar busca
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
