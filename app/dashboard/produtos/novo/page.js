'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function NovoProduto() {
    const router = useRouter()
    const { data: session } = useSession()
    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [marca, setMarca] = useState('')
    const [variantes, setVariantes] = useState([
        { tamanho: '', cor: '', genero: '', tecido: '', precoCusto: '', precoVenda: '', quantidade: 0 }
    ])
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState(null)

    const adicionarVariante = () => {
        setVariantes([...variantes, { tamanho: '', cor: '', genero: '', tecido: '', precoCusto: '', precoVenda: '', quantidade: 0 }])
    }

    const removerVariante = (index) => {
        setVariantes(variantes.filter((_, i) => i !== index))
    }

    const atualizarVariante = (index, campo, valor) => {
        const novas = [...variantes]
        novas[index][campo] = valor
        setVariantes(novas)
    }

    const handleCriar = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, categoria, marca, variantes, negocioId: session?.user?.negocioId })
        })

        const dados = await res.json()
        if (dados.id) {
            router.push('/dashboard')
        } else {
            setErro('Produto não adicionado')
        }
    }

    return (
  <div className="max-w-2xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-medium text-gray-900">Novo produto</h2>
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="text-sm text-gray-400 hover:text-gray-600"
      >
        Cancelar
      </button>
    </div>

    <form onSubmit={handleCriar} className="flex flex-col gap-3">
      <input
        placeholder="Nome do produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        placeholder="Categoria"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        placeholder="Marca (opcional)"
        value={marca}
        onChange={e => setMarca(e.target.value)}
        className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />

      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Variantes</h3>

        {variantes.map((variante, index) => (
          <div key={index} className="border border-gray-100 rounded p-3 mb-3 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Tamanho"
                value={variante.tamanho}
                onChange={e => atualizarVariante(index, 'tamanho', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                placeholder="Cor"
                value={variante.cor}
                onChange={e => atualizarVariante(index, 'cor', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                placeholder="Gênero"
                value={variante.genero}
                onChange={e => atualizarVariante(index, 'genero', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                placeholder="Tecido"
                value={variante.tecido}
                onChange={e => atualizarVariante(index, 'tecido', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                placeholder="Preço de custo"
                value={variante.precoCusto}
                onChange={e => atualizarVariante(index, 'precoCusto', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                placeholder="Preço de venda"
                value={variante.precoVenda}
                onChange={e => atualizarVariante(index, 'precoVenda', e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                placeholder="Quantidade"
                value={variante.quantidade}
                onChange={e => atualizarVariante(index, 'quantidade', e.target.value)}
                className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
              <button
                type="button"
                onClick={() => removerVariante(index)}
                className="text-gray-300 hover:text-red-400 text-lg"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={adicionarVariante}
          className="text-sm text-gray-400 border border-dashed border-gray-200 rounded px-3 py-2 w-full hover:border-gray-400"
        >
          + Adicionar variante
        </button>
      </div>

      {erro && <p className="text-xs text-red-400">{erro}</p>}

      <button
        type="submit"
        disabled={loading}
        className="text-sm bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50 mt-2"
      >
        {loading ? 'Salvando...' : 'Cadastrar produto'}
      </button>
    </form>
  </div>
)
}