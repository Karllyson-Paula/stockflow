'use client'

import { useState } from "react"

export default function ListaProdutos({ produtos }) {
    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [listaProdutos, setListaProdutos] = useState(produtos)

    const produtosFiltrados = listaProdutos.filter(produto => {
        const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase())
        const matchCategoria = categoria ? produto.categoria.toLowerCase() === categoria.toLocaleLowerCase() : true
        return matchBusca && matchCategoria
    })

    const deleter = async (id) => {
        const confirmado = confirm('Deseja apagar esse produto e todas as suas variantes?')
        if (!confirmado) return 

        await fetch(`/api/produtos/${id}`, {
            method: 'DELETE'
        })
        setListaProdutos(listaProdutos.filter(p => p.id !== id))
    }

    const deletarVariante = async (produtoId, varianteId) => {
        const confirmado = confirm('Deseja apagar a variante desse produto?')
        if (!confirmado) return

        await fetch(`/api/produtos/${produtoId}/variantes/${varianteId}`, {
            method: 'DELETE'
        })

        setListaProdutos(listaProdutos.map(p => 
            p.id === produtoId
              ? { ...p, variantes: p.variantes.filter(v => v.id !== varianteId) }
              : p
        ))
    }

    const todasCategorias = listaProdutos.map(p => p.categoria)
    
    const categorias = [...new Set(todasCategorias)]

    return (
  <div className="px-4 py-4">
    <div className="flex gap-2 mb-4">
      <input
        placeholder="Pesquisar..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
      />
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="text-sm px-3 py-2 border border-gray-200 rounded bg-transparent text-gray-600 focus:outline-none focus:border-gray-400"
      >
        <option value="">Todas as categorias</option>
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {produtosFiltrados.map(produto => (
      <div key={produto.id} className="border-b border-gray-100 py-3">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-sm font-medium text-gray-900">{produto.nome}</span>
            <span className="text-xs text-gray-400 ml-2">{produto.categoria}</span>
          </div>
          <button
            type="button"
            onClick={() => deleter(produto.id)}
            className="text-xs text-gray-400 hover:text-red-400"
          >
            Deletar
          </button>
        </div>

        {produto.variantes.map((variante, i) => (
          <div key={i} className="flex items-center gap-2 py-1 text-xs text-gray-500">
            <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
            <span className="flex-1">
              {variante.tamanho} · {variante.cor} · {variante.genero}
            </span>
            <span className="text-gray-400">{variante.quantidade} un.</span>
            <span className="font-medium text-gray-700">R$ {variante.precoVenda}</span>
            <button
              type="button"
              onClick={() => deletarVariante(produto.id, variante.id)}
              className="text-gray-300 hover:text-red-400 ml-1"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>
)
}