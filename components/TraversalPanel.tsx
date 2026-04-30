"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TreeNode, TraversalType } from "@/types/tree"
import { preOrder, inOrder, postOrder } from "@/utils/treeAlgorithms"

interface TraversalPanelProps {
  tree: TreeNode | null
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

    setResult(traversalResult.join(" → "))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Caminhamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={traversalType === "pre-order" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTraversal("pre-order")}
          >
            Pré-ordem
          </Button>
          <Button
            variant={traversalType === "in-order" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTraversal("in-order")}
          >
            Em-ordem
          </Button>
          <Button
            variant={traversalType === "post-order" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTraversal("post-order")}
          >
            Pós-ordem
          </Button>
        </div>

        {result && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1 font-medium">
              {traversalType === "pre-order" && "Pré-ordem (Nó → Filhos)"}
              {traversalType === "in-order" && "Em-ordem (1º Filho → Nó → Restantes)"}
              {traversalType === "post-order" && "Pós-ordem (Filhos → Nó)"}
            </p>
            <p className="text-sm break-words max-h-40 overflow-y-auto">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
