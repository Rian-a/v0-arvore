"use client"

import { useState } from "react"
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { TreeNode, TraversalType } from "@/types/tree"
import { preOrder, inOrder, postOrder } from "@/utils/treeAlgorithms"
import { cn } from "@/lib/utils"

interface TraversalPanelProps {
  tree: TreeNode | null
}

const traversalInfo = {
  "pre-order": {
    title: "Pre-ordem",
    description: "Visita o no atual, depois os filhos (No -> Filhos)",
    icon: ArrowDownNarrowWide,
    color: "bg-violet-500 hover:bg-violet-600",
    activeColor: "bg-violet-600 ring-2 ring-violet-300",
    resultBg: "bg-violet-50 border-violet-200",
    resultText: "text-violet-800",
  },
  "in-order": {
    title: "Em-ordem",
    description: "Visita primeiro filho, no atual, demais filhos (1o Filho -> No -> Restantes)",
    icon: ArrowLeftRight,
    color: "bg-sky-500 hover:bg-sky-600",
    activeColor: "bg-sky-600 ring-2 ring-sky-300",
    resultBg: "bg-sky-50 border-sky-200",
    resultText: "text-sky-800",
  },
  "post-order": {
    title: "Pos-ordem",
    description: "Visita todos os filhos, depois o no atual (Filhos -> No)",
    icon: ArrowUpNarrowWide,
    color: "bg-teal-500 hover:bg-teal-600",
    activeColor: "bg-teal-600 ring-2 ring-teal-300",
    resultBg: "bg-teal-50 border-teal-200",
    resultText: "text-teal-800",
  },
}

export function TraversalPanel({ tree }: TraversalPanelProps) {
  const [traversalType, setTraversalType] = useState<TraversalType | null>(null)
  const [result, setResult] = useState<string>("")

  const handleTraversal = (type: TraversalType) => {
    if (!tree) return

    setTraversalType(type)

    let traversalResult: string[]
    switch (type) {
      case "pre-order":
        traversalResult = preOrder(tree)
        break
      case "in-order":
        traversalResult = inOrder(tree)
        break
      case "post-order":
        traversalResult = postOrder(tree)
        break
    }

    setResult(traversalResult.join(" -> "))
  }

  const clearTraversal = () => {
    setTraversalType(null)
    setResult("")
  }

  const activeInfo = traversalType ? traversalInfo[traversalType] : null

  return (
    <Card className="border-2">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg">Caminhamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex flex-col gap-2">
          {(Object.keys(traversalInfo) as TraversalType[]).map((type) => {
            const info = traversalInfo[type]
            const Icon = info.icon
            const isActive = traversalType === type
            return (
              <Button
                key={type}
                variant="default"
                size="sm"
                onClick={() => handleTraversal(type)}
                className={cn(
                  "justify-start text-white transition-all",
                  isActive ? info.activeColor : info.color
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {info.title}
                {isActive && (
                  <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded">
                    Ativo
                  </span>
                )}
              </Button>
            )
          })}
        </div>

        {activeInfo && result && (
          <div className={cn("p-4 rounded-lg border-2", activeInfo.resultBg)}>
            <div className="flex items-center justify-between mb-2">
              <p className={cn("text-sm font-semibold", activeInfo.resultText)}>
                {activeInfo.title}
              </p>
              <Button variant="ghost" size="sm" onClick={clearTraversal} className="h-6 text-xs">
                Limpar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{activeInfo.description}</p>
            <ScrollArea className="h-32">
              <p className={cn("text-sm break-words leading-relaxed", activeInfo.resultText)}>
                {result}
              </p>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
