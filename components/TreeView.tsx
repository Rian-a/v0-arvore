"use client"

import { Expand, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TreeNodeComponent } from "./TreeNodeComponent"
import type { TreeNode } from "@/types/tree"

interface TreeViewProps {
  tree: TreeNode | null
  highlightedPath: string[]
  selectedNode: TreeNode | null
  expandedNodes: Set<string>
  scrollToNodeId: string | null
  onSelectNode: (node: TreeNode) => void
  onToggleExpand: (nodeId: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  onRequestRemove: (nodeId: string, nodeName: string) => void
}

export function TreeView({
  tree,
  highlightedPath,
  selectedNode,
  expandedNodes,
  scrollToNodeId,
  onSelectNode,
  onToggleExpand,
  onExpandAll,
  onCollapseAll,
  onRequestRemove,
}: TreeViewProps) {
  if (!tree) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Carregando arvore...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full border-2">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Arvore Rick and Morty</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExpandAll}>
              <Expand className="h-4 w-4 mr-1" />
              Expandir tudo
            </Button>
            <Button variant="outline" size="sm" onClick={onCollapseAll}>
              <Minimize2 className="h-4 w-4 mr-1" />
              Recolher tudo
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Clique para selecionar um no. Use os botoes para remover.
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-1">
            <TreeNodeComponent
              node={tree}
              highlightedPath={highlightedPath}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onSelectNode={onSelectNode}
              onToggleExpand={onToggleExpand}
              onRequestRemove={onRequestRemove}
              scrollToNodeId={scrollToNodeId}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
