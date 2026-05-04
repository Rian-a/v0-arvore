"use client"

import { useState } from "react"
import { Plus, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TreeNode } from "@/types/tree"
import { getAllNodes, generateId } from "@/utils/treeAlgorithms"

interface InsertPanelProps {
  tree: TreeNode | null
  onInsertNode: (parentId: string, newNode: TreeNode) => void
  onShowToast: (message: string, type: "success" | "error" | "warning" | "info") => void
}

export function InsertPanel({ tree, onInsertNode, onShowToast }: InsertPanelProps) {
  const [nodeName, setNodeName] = useState("")
  const [parentId, setParentId] = useState<string>("")

  const allNodes = tree ? getAllNodes(tree) : []

  const handleInsert = () => {
    if (!nodeName.trim() || !parentId) return

    const parentNode = allNodes.find((n) => n.id === parentId)
    const newNode: TreeNode = {
      id: generateId(),
      valor: nodeName.trim(),
      filhos: [],
      pai: parentId,
    }

    onInsertNode(parentId, newNode)
    onShowToast(`No "${nodeName.trim()}" inserido em "${parentNode?.valor}"`, "success")
    setNodeName("")
    setParentId("")
  }

  return (
    <Card className="border-2">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <FolderPlus className="h-5 w-5 text-emerald-500" />
          Inserir No
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Nome do novo no
          </label>
          <Input
            placeholder="Digite o nome..."
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="border-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Selecione o no pai
          </label>
          <Select value={parentId} onValueChange={setParentId}>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Escolha o no pai..." />
            </SelectTrigger>
            <SelectContent>
              {allNodes.map((node) => (
                <SelectItem key={node.id} value={node.id}>
                  {node.valor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleInsert}
          disabled={!nodeName.trim() || !parentId}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Inserir No
        </Button>
      </CardContent>
    </Card>
  )
}
