"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, MapPin, User, Globe } from "lucide-react"
import type { TreeNode } from "@/types/tree"
import { nodeDegree } from "@/utils/treeAlgorithms"
import { cn } from "@/lib/utils"

interface TreeNodeComponentProps {
  node: TreeNode
  highlightedPath: string[]
  selectedNode: TreeNode | null
  onSelectNode: (node: TreeNode) => void
  onRemoveNode: (nodeId: string) => void
  level?: number
}

export function TreeNodeComponent({
  node,
  highlightedPath,
  selectedNode,
  onSelectNode,
  onRemoveNode,
  level = 0,
}: TreeNodeComponentProps) {
  const [isExpanded, setIsExpanded] = useState(level < 1)
  const hasChildren = node.filhos.length > 0
  const isHighlighted = highlightedPath.includes(node.id)
  const isSelected = selectedNode?.id === node.id
  const degree = nodeDegree(node)

  const getIcon = () => {
    if (node.id === "root") return <Globe className="h-4 w-4" />
    if (node.id.startsWith("location")) return <MapPin className="h-4 w-4" />
    return <User className="h-4 w-4" />
  }

  const getNodeColor = () => {
    if (isSelected) return "bg-emerald-500 text-white"
    if (isHighlighted) return "bg-amber-400 text-amber-900"
    if (node.id === "root") return "bg-violet-100 text-violet-800 hover:bg-violet-200"
    if (node.id.startsWith("location")) return "bg-sky-100 text-sky-800 hover:bg-sky-200"
    return "bg-slate-100 text-slate-800 hover:bg-slate-200"
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-200",
          getNodeColor()
        )}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => onSelectNode(node)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="p-0.5 hover:bg-black/10 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}

        {getIcon()}

        <span className="font-medium flex-1">{node.valor}</span>

        <span className="text-xs opacity-70 bg-black/10 px-2 py-0.5 rounded">
          Grau: {degree}
        </span>

        {node.id !== "root" && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemoveNode(node.id)
            }}
            className="text-xs px-2 py-0.5 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Remover
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {node.filhos.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              highlightedPath={highlightedPath}
              selectedNode={selectedNode}
              onSelectNode={onSelectNode}
              onRemoveNode={onRemoveNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
