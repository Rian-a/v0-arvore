"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TreeNode } from "@/types/tree"
import { treeHeight, nodeDegree, getAllNodes } from "@/utils/treeAlgorithms"

interface MetricsPanelProps {
  tree: TreeNode | null
  selectedNode: TreeNode | null
}

export function MetricsPanel({ tree, selectedNode }: MetricsPanelProps) {
  const height = treeHeight(tree)
  const totalNodes = tree ? getAllNodes(tree).length : 0
  const selectedDegree = selectedNode ? nodeDegree(selectedNode) : null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Métricas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-violet-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-violet-700">{height}</p>
            <p className="text-xs text-violet-600">Altura da Árvore</p>
          </div>
          <div className="p-3 bg-sky-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-sky-700">{totalNodes}</p>
            <p className="text-xs text-sky-600">Total de Nós</p>
          </div>
        </div>

        {selectedNode && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
            <p className="text-sm font-medium text-emerald-800">
              Nó selecionado: {selectedNode.valor}
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Grau: {selectedDegree} filho(s)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
