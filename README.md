# Rick and Morty - Árvore Interativa

Projeto acadêmico desenvolvido para a disciplina de Estrutura de Dados.

A aplicação consome a API pública Rick and Morty e organiza os dados em uma árvore genérica interativa, permitindo visualizar e manipular algoritmos clássicos de árvores em tempo real.

---

# Objetivo

Demonstrar o funcionamento de estruturas de dados do tipo árvore utilizando dados reais obtidos de uma API pública.

O sistema permite:

- Visualizar uma árvore hierárquica
- Executar caminhamentos
- Realizar buscas em profundidade (DFS)
- Inserir nós localmente
- Remover nós e subárvores
- Calcular altura da árvore
- Calcular grau dos nós

---

# Estrutura da Árvore

A hierarquia utilizada foi:

```text
Locations
 ├── Earth
 │    ├── Rick Sanchez
 │    ├── Morty Smith
 │    └── Summer Smith
 │
 ├── Citadel of Ricks
 │    ├── Evil Morty
 │    └── Rick Prime
```

- Raiz: `Locations`
- Filhos: `Locations`
- Sub-filhos: `Residents`

---

# Tecnologias Utilizadas

- React
- JavaScript
- TailwindCSS
- Rick and Morty API

API utilizada:

https://rickandmortyapi.com/

---

# Funcionalidades

## Visualização da Árvore

- Renderização hierárquica
- Nós clicáveis
- Expansão e recolhimento de nós
- Destaque visual para seleção e busca

---

## Caminhamentos

Implementação dos algoritmos:

- Pré-ordem
- Em-ordem (adaptado para árvore genérica)
- Pós-ordem

Os resultados são exibidos diretamente na interface.

---

## Busca em Profundidade (DFS)

Busca utilizando o algoritmo DFS (Depth First Search).

Funcionalidades:
- Busca por nome
- Destaque do nó encontrado
- Exibição do caminho completo

Exemplo:

```text
Locations → Earth → Rick Sanchez
```

---

## Inserção Local

Permite adicionar novos nós manualmente:

- Nome do novo nó
- Seleção do nó pai

A árvore é atualizada em tempo real.

---

## Remoção Local

Permite remover:
- Um nó específico
- Toda sua subárvore

A estrutura é reorganizada automaticamente.

---

## Métricas

Exibição em tempo real de:

- Altura da árvore
- Grau dos nós

Definições:
- Altura: maior caminho entre raiz e folha
- Grau: quantidade de filhos de um nó

---

# Estrutura do Projeto

```text
src/
├── components/
├── services/
├── utils/
├── App.jsx
```

## components/

Responsável pela interface visual da aplicação.

## services/

Responsável pelas chamadas da API.

## utils/

Implementação manual dos algoritmos e operações da árvore.

---

# Conceitos Aplicados

- Árvores genéricas
- Estruturas hierárquicas
- Recursão
- DFS (Depth First Search)
- Caminhamentos em árvore
- Inserção e remoção de nós
- Manipulação dinâmica em memória

---

# Como Executar

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

---

# Observação

Este projeto foi desenvolvido exclusivamente para fins educativos e acadêmicos, com foco no aprendizado de Estruturas de Dados e manipulação de árvores em memória.

---

# Autor

Rian Simão Gomes  
Estudante de Análise e Desenvolvimento de Sistemas
