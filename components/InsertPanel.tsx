"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
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
}

export function InsertPanel({ tree, onInsertNode }: InsertPanelProps) {
  const [nodeName, setNodeName] = useState("")
  const [parentId, setParentId] = useState<string>("")

  const allNodes = tree ? getAllNodes(tree) : []

  const handleInsert = () => {
    if (!nodeName.trim() || !parentId) return

    const newNode: TreeNode = {
      id: generateId(),
      valor: nodeName.trim(),
      filhos: [],
      pai: parentId,
    }

    onInsertNode(parentId, newNode)
    setNodeName("")
    setParentId("")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Inserir Nó</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nome do nó"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />

        <Select value={parentId} onValueChange={setParentId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o nó pai" />
          </SelectTrigger>
          <SelectContent>
            {allNodes.map((node) => (
              <SelectItem key={node.id} value={node.id}>
                {node.valor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleInsert}
          disabled={!nodeName.trim() || !parentId}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Inserir
        </Button>
      </CardContent>
    </Card>
  )
}
