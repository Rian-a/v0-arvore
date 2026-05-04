"use client"

import { useEffect, useRef } from "react"
import { ChevronRight, ChevronDown, MapPin, User, TreeDeciduous, Leaf } from "lucide-react"
import type { TreeNode } from "@/types/tree"
import { nodeDegree } from "@/utils/treeAlgorithms"
import { cn } from "@/lib/utils"

interface TreeNodeComponentProps {
  node: TreeNode
  highlightedPath: string[]
  selectedNode: TreeNode | null
  expandedNodes: Set<string>
  onSelectNode: (node: TreeNode) => void
  onToggleExpand: (nodeId: string) => void
  onRequestRemove: (nodeId: string, nodeName: string) => void
  level?: number
  scrollToNodeId?: string | null
}

export function TreeNodeComponent({
  node,
  highlightedPath,
  selectedNode,
  expandedNodes,
  onSelectNode,
  onToggleExpand,
  onRequestRemove,
  level = 0,
  scrollToNodeId,
}: TreeNodeComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const hasChildren = node.filhos.length > 0
  const isExpanded = expandedNodes.has(node.id)
  const isHighlighted = highlightedPath.includes(node.id)
  const isSelected = selectedNode?.id === node.id
  const degree = nodeDegree(node)
  const isLeaf = node.filhos.length === 0
  const isRoot = node.id === "root"
  const isLocation = node.id.startsWith("location")

  // Scroll automático até o nó encontrado
  useEffect(() => {
    if (scrollToNodeId === node.id && nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [scrollToNodeId, node.id])

  const getIcon = () => {
    if (isRoot) return <TreeDeciduous className="h-4 w-4 shrink-0" />
    if (isLocation) return <MapPin className="h-4 w-4 shrink-0" />
    if (isLeaf) return <Leaf className="h-4 w-4 shrink-0 text-emerald-600" />
    return <User className="h-4 w-4 shrink-0" />
  }

  const getNodeType = () => {
    if (isRoot) return "raiz"
    if (isLeaf) return "folha"
    return "interno"
  }

  const getNodeColor = () => {
    if (isSelected) return "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
    if (isHighlighted) return "bg-amber-400 text-amber-900 shadow-md shadow-amber-100"
    if (isRoot) return "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800 hover:from-teal-100 hover:to-cyan-100 border border-teal-200"
    if (isLocation) return "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
    if (isLeaf) return "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
    return "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
  }

  const getTypeColor = () => {
    if (isRoot) return "bg-teal-500 text-white"
    if (isLeaf) return "bg-emerald-100 text-emerald-700"
    return "bg-sky-100 text-sky-700"
  }

  return (
    <div className="select-none">
      <div
        ref={nodeRef}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-300",
          getNodeColor()
        )}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => onSelectNode(node)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand(node.id)
            }}
            className="p-1 hover:bg-black/10 rounded transition-transform duration-200"
          >
            <div className={cn("transition-transform duration-200", isExpanded && "rotate-90")}>
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        ) : (
          <span className="w-6" />
        )}

        {getIcon()}

        <span className="font-medium flex-1 truncate">{node.valor}</span>

        {hasChildren && (
          <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full shrink-0">
            {node.filhos.length} filho{node.filhos.length !== 1 ? "s" : ""}
          </span>
        )}

        <span className={cn("text-xs px-2 py-0.5 rounded-full shrink-0", getTypeColor())}>
          {getNodeType()}
        </span>

        <span className="text-xs opacity-70 bg-black/10 px-2 py-0.5 rounded shrink-0">
          Grau: {degree}
        </span>

        {!isRoot && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRequestRemove(node.id, node.valor)
            }}
            className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors shrink-0"
          >
            Remover
          </button>
        )}
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {hasChildren && (
          <div className="mt-1 space-y-1">
            {node.filhos.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                highlightedPath={highlightedPath}
                selectedNode={selectedNode}
                expandedNodes={expandedNodes}
                onSelectNode={onSelectNode}
                onToggleExpand={onToggleExpand}
                onRequestRemove={onRequestRemove}
                level={level + 1}
                scrollToNodeId={scrollToNodeId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
