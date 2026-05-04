"use client"

import { BarChart3, TreeDeciduous, Users, Layers, Target } from "lucide-react"
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

  // Contar tipos de nós
  const allNodes = tree ? getAllNodes(tree) : []
  const locations = allNodes.filter((n) => n.id.startsWith("location")).length
  const characters = allNodes.filter(
    (n) => !n.id.startsWith("location") && n.id !== "root"
  ).length

  return (
    <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
      <CardHeader className="pb-3 border-b border-teal-200">
        <CardTitle className="text-lg flex items-center gap-2 text-teal-800">
          <BarChart3 className="h-5 w-5" />
          Metricas da Arvore
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-lg border border-teal-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TreeDeciduous className="h-4 w-4 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-teal-700">{height}</p>
            <p className="text-xs text-teal-600">Altura</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-sky-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Layers className="h-4 w-4 text-sky-600" />
            </div>
            <p className="text-2xl font-bold text-sky-700">{totalNodes}</p>
            <p className="text-xs text-sky-600">Total de Nos</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-violet-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-violet-700">{locations}</p>
            <p className="text-xs text-violet-600">Locations</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-amber-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-700">{characters}</p>
            <p className="text-xs text-amber-600">Personagens</p>
          </div>
        </div>

        {selectedNode && (
          <div className="mt-4 p-4 bg-emerald-100 border-2 border-emerald-300 rounded-lg">
            <p className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              No Selecionado
            </p>
            <div className="space-y-1">
              <p className="text-base font-bold text-emerald-900">{selectedNode.valor}</p>
              <p className="text-sm text-emerald-700">
                Grau: <span className="font-bold">{selectedDegree}</span> filho
                {selectedDegree !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-emerald-600">
                Tipo:{" "}
                {selectedNode.id === "root"
                  ? "Raiz"
                  : selectedNode.filhos.length === 0
                  ? "Folha"
                  : "Interno"}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
