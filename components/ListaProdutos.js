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

    return (
        <div>
            <input
            placeholder="Pesquisar"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            />

            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="">Todas as categorias</option>
                <option value="calça">Calça</option>
                <option value="camisa">Camisa</option>
            </select>

            {produtosFiltrados.map(produto => (
                <div key={produto.id}>
                    <p>{produto.nome}</p>
                    {produto.variantes.map((variante, i) => (
                        <div key={i}>
                            <p>
                                Tamanho: {variante.tamanho} |
                                Cor: {variante.cor} |
                                Qtd: {variante.quantidade} |
                                R$: {variante.precoVenda}
                            </p>
                            <button type="button" onClick={() => deletarVariante(produto.id, variante.id)}>🗑️</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => deleter(produto.id)}>Deletar</button>
                </div>
            ))}
            
        </div>
    )
}