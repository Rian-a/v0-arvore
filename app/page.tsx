"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, TreeDeciduous } from "lucide-react"
import type { TreeNode } from "@/types/tree"
import { fetchAllData } from "@/services/rickAndMortyApi"
import { buildTree } from "@/utils/treeBuilder"
import { insertNode, removeNode, getAllNodes } from "@/utils/treeAlgorithms"
import { TreeView } from "@/components/TreeView"
import { TraversalPanel } from "@/components/TraversalPanel"
import { SearchPanel } from "@/components/SearchPanel"
import { InsertPanel } from "@/components/InsertPanel"
import { MetricsPanel } from "@/components/MetricsPanel"
import { FeedbackToast, type ToastType } from "@/components/FeedbackToast"
import { ConfirmDialog } from "@/components/ConfirmDialog"

export default function Home() {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [highlightedPath, setHighlightedPath] = useState<string[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]))
  const [scrollToNodeId, setScrollToNodeId] = useState<string | null>(null)

  // Toast state
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<ToastType>("success")
  const [toastVisible, setToastVisible] = useState(false)

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [nodeToRemove, setNodeToRemove] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const { locations, charactersByLocation } = await fetchAllData()
        const treeData = buildTree(locations, charactersByLocation)
        setTree(treeData)
        // Expandir root por padrão
        setExpandedNodes(new Set(["root"]))
      } catch (err) {
        setError("Erro ao carregar dados da API Rick and Morty")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const showToast = useCallback((message: string, type: ToastType) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
  }, [])

  const handleSelectNode = (node: TreeNode) => {
    setSelectedNode(node)
  }

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleExpandAll = () => {
    if (!tree) return
    const allIds = getAllNodes(tree).map((n) => n.id)
    setExpandedNodes(new Set(allIds))
  }

  const handleCollapseAll = () => {
    setExpandedNodes(new Set(["root"]))
  }

  const handleInsertNode = (parentId: string, newNode: TreeNode) => {
    if (!tree) return
    const newTree = insertNode(tree, parentId, newNode)
    setTree(newTree)
    // Expandir o pai para mostrar o novo nó
    setExpandedNodes((prev) => new Set([...prev, parentId]))
  }

  const handleRequestRemove = (nodeId: string, nodeName: string) => {
    setNodeToRemove({ id: nodeId, name: nodeName })
    setConfirmOpen(true)
  }

  const handleConfirmRemove = () => {
    if (!tree || !nodeToRemove) return
    const newTree = removeNode(tree, nodeToRemove.id)
    if (newTree) {
      setTree(newTree)
      if (selectedNode?.id === nodeToRemove.id) {
        setSelectedNode(null)
      }
      showToast(`No "${nodeToRemove.name}" removido com sucesso`, "success")
    }
    setConfirmOpen(false)
    setNodeToRemove(null)
  }

  const handleCancelRemove = () => {
    setConfirmOpen(false)
    setNodeToRemove(null)
  }

  const handleHighlightPath = (nodeIds: string[]) => {
    setHighlightedPath(nodeIds)
    // Expandir todos os nós no caminho
    if (nodeIds.length > 0) {
      setExpandedNodes((prev) => new Set([...prev, ...nodeIds]))
    }
  }

  const handleScrollToNode = (nodeId: string) => {
    setScrollToNodeId(nodeId)
    // Reset após um tempo para permitir scroll novamente
    setTimeout(() => setScrollToNodeId(null), 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-teal-500 mx-auto" />
            <TreeDeciduous className="h-8 w-8 text-teal-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-lg text-teal-700 font-medium">
            Carregando dados do Rick and Morty...
          </p>
          <p className="text-sm text-teal-600">
            (Buscando todas as locations e residents)
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg border-2 border-red-200">
          <p className="text-lg text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2 py-4">
          <div className="flex items-center justify-center gap-3">
            <TreeDeciduous className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-teal-800">
              Rick and Morty - Arvore Interativa
            </h1>
            <TreeDeciduous className="h-8 w-8 text-teal-600" />
          </div>
          <p className="text-teal-600">
            Visualizacao hierarquica de Locations e Residents
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Painel lateral esquerdo */}
          <div className="space-y-4">
            <MetricsPanel tree={tree} selectedNode={selectedNode} />
            <TraversalPanel tree={tree} />
          </div>

          {/* Árvore central - ocupa 2 colunas */}
          <div className="lg:col-span-2">
            <TreeView
              tree={tree}
              highlightedPath={highlightedPath}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              scrollToNodeId={scrollToNodeId}
              onSelectNode={handleSelectNode}
              onToggleExpand={handleToggleExpand}
              onExpandAll={handleExpandAll}
              onCollapseAll={handleCollapseAll}
              onRequestRemove={handleRequestRemove}
            />
          </div>

          {/* Painel lateral direito */}
          <div className="space-y-4">
            <SearchPanel
              tree={tree}
              onHighlightPath={handleHighlightPath}
              onScrollToNode={handleScrollToNode}
              onShowToast={showToast}
            />
            <InsertPanel
              tree={tree}
              onInsertNode={handleInsertNode}
              onShowToast={showToast}
            />
          </div>
        </div>
      </div>

      {/* Toast de feedback */}
      <FeedbackToast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      {/* Dialog de confirmação de remoção */}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Confirmar Remocao"
        description={`Tem certeza que deseja remover o no "${nodeToRemove?.name}" e toda sua subarvore? Esta acao nao pode ser desfeita.`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </main>
  )
}
