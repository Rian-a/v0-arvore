"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TreeNodeComponent } from "./TreeNodeComponent"
import type { TreeNode } from "@/types/tree"

interface TreeViewProps {
  tree: TreeNode | null
  highlightedPath: string[]
  selectedNode: TreeNode | null
  onSelectNode: (node: TreeNode) => void
  onRemoveNode: (nodeId: string) => void
}

export function TreeView({
  tree,
  highlightedPath,
  selectedNode,
  onSelectNode,
  onRemoveNode,
}: TreeViewProps) {
  if (!tree) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Carregando árvore...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Árvore Rick and Morty
          <span className="text-xs font-normal text-muted-foreground">
            (Clique para selecionar, use os botões para remover)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-1">
            <TreeNodeComponent
              node={tree}
              highlightedPath={highlightedPath}
              selectedNode={selectedNode}
              onSelectNode={onSelectNode}
              onRemoveNode={onRemoveNode}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
