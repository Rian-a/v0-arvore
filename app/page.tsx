"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import type { TreeNode } from "@/types/tree"
import { fetchAllData } from "@/services/rickAndMortyApi"
import { buildTree } from "@/utils/treeBuilder"
import { insertNode, removeNode } from "@/utils/treeAlgorithms"
import { TreeView } from "@/components/TreeView"
import { TraversalPanel } from "@/components/TraversalPanel"
import { SearchPanel } from "@/components/SearchPanel"
import { InsertPanel } from "@/components/InsertPanel"
import { MetricsPanel } from "@/components/MetricsPanel"

export default function Home() {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [highlightedPath, setHighlightedPath] = useState<string[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const { locations, charactersByLocation } = await fetchAllData()
        const treeData = buildTree(locations, charactersByLocation)
        setTree(treeData)
      } catch (err) {
        setError("Erro ao carregar dados da API Rick and Morty")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSelectNode = (node: TreeNode) => {
    setSelectedNode(node)
  }

  const handleInsertNode = (parentId: string, newNode: TreeNode) => {
    if (!tree) return
    const newTree = insertNode(tree, parentId, newNode)
    setTree(newTree)
  }

  const handleRemoveNode = (nodeId: string) => {
    if (!tree) return
    const newTree = removeNode(tree, nodeId)
    if (newTree) {
      setTree(newTree)
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null)
      }
    }
  }

  const handleHighlightPath = (nodeIds: string[]) => {
    setHighlightedPath(nodeIds)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">
            Carregando dados do Rick and Morty...
          </p>
          <p className="text-sm text-muted-foreground">
            (Buscando todas as locations e residents)
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Rick and Morty - Árvore Interativa
          </h1>
          <p className="text-muted-foreground">
            Visualização hierárquica de Locations e Residents
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel lateral esquerdo */}
          <div className="space-y-4">
            <MetricsPanel tree={tree} selectedNode={selectedNode} />
            <TraversalPanel tree={tree} />
          </div>

          {/* Árvore central */}
          <div className="lg:col-span-1">
            <TreeView
              tree={tree}
              highlightedPath={highlightedPath}
              selectedNode={selectedNode}
              onSelectNode={handleSelectNode}
              onRemoveNode={handleRemoveNode}
            />
          </div>

          {/* Painel lateral direito */}
          <div className="space-y-4">
            <SearchPanel tree={tree} onHighlightPath={handleHighlightPath} />
            <InsertPanel tree={tree} onInsertNode={handleInsertNode} />
          </div>
        </div>
      </div>
    </main>
  )
}
