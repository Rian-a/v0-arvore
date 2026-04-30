import type { TreeNode } from "@/types/tree"

// Caminhamento pré-ordem: visita nó → filhos (esquerda para direita)
export function preOrder(node: TreeNode | null): string[] {
  if (!node) return []

  const result: string[] = [node.valor]

  for (const child of node.filhos) {
    result.push(...preOrder(child))
  }

  return result
}

// Caminhamento em-ordem: primeiro filho → nó → restantes filhos
export function inOrder(node: TreeNode | null): string[] {
  if (!node) return []

  const result: string[] = []

  if (node.filhos.length === 0) {
    // Folha: apenas o nó
    result.push(node.valor)
  } else {
    // Primeiro filho
    result.push(...inOrder(node.filhos[0]))

    // Nó atual
    result.push(node.valor)

    // Restantes filhos
    for (let i = 1; i < node.filhos.length; i++) {
      result.push(...inOrder(node.filhos[i]))
    }
  }

  return result
}

// Caminhamento pós-ordem: filhos → nó
export function postOrder(node: TreeNode | null): string[] {
  if (!node) return []

  const result: string[] = []

  for (const child of node.filhos) {
    result.push(...postOrder(child))
  }

  result.push(node.valor)

  return result
}

// DFS com retorno de caminho até um nó específico
export function dfsPath(node: TreeNode | null, targetId: string): string[] | null {
  if (!node) return null

  if (node.id === targetId) {
    return [node.valor]
  }

  for (const child of node.filhos) {
    const path = dfsPath(child, targetId)
    if (path) {
      return [node.valor, ...path]
    }
  }

  return null
}

// Buscar nó por ID usando DFS
export function findNodeById(node: TreeNode | null, id: string): TreeNode | null {
  if (!node) return null

  if (node.id === id) return node

  for (const child of node.filhos) {
    const found = findNodeById(child, id)
    if (found) return found
  }

  return null
}

// Inserção de novo nó com pai especificado
export function insertNode(tree: TreeNode, parentId: string, newNode: TreeNode): TreeNode {
  // Cria cópia profunda para não mutar estado
  const deepCopy = (node: TreeNode): TreeNode => ({
    ...node,
    filhos: node.filhos.map(deepCopy),
  })

  const newTree = deepCopy(tree)

  const parent = findNodeById(newTree, parentId)
  if (parent) {
    parent.filhos.push({ ...newNode, pai: parentId })
  }

  return newTree
}

// Remoção de nó (e toda sua subárvore)
export function removeNode(tree: TreeNode, nodeId: string): TreeNode | null {
  // Não pode remover a raiz
  if (tree.id === nodeId) return null

  // Cria cópia profunda
  const deepCopy = (node: TreeNode): TreeNode => ({
    ...node,
    filhos: node.filhos.map(deepCopy),
  })

  const newTree = deepCopy(tree)

  const removeFromParent = (parent: TreeNode): boolean => {
    const index = parent.filhos.findIndex((child) => child.id === nodeId)
    if (index !== -1) {
      parent.filhos.splice(index, 1)
      return true
    }

    for (const child of parent.filhos) {
      if (removeFromParent(child)) return true
    }

    return false
  }

  removeFromParent(newTree)
  return newTree
}

// Altura da árvore (-1 para vazia, 0 para folha)
export function treeHeight(node: TreeNode | null): number {
  if (!node) return -1

  if (node.filhos.length === 0) return 0

  let maxChildHeight = -1
  for (const child of node.filhos) {
    const childHeight = treeHeight(child)
    if (childHeight > maxChildHeight) {
      maxChildHeight = childHeight
    }
  }

  return maxChildHeight + 1
}

// Grau de um nó (número de filhos)
export function nodeDegree(node: TreeNode | null): number {
  if (!node) return 0
  return node.filhos.length
}

// Coletar todos os nós da árvore (para seleção)
export function getAllNodes(node: TreeNode | null): TreeNode[] {
  if (!node) return []

  const nodes: TreeNode[] = [node]

  for (const child of node.filhos) {
    nodes.push(...getAllNodes(child))
  }

  return nodes
}

// Gerar ID único
export function generateId(): string {
  return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
