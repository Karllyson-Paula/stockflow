'use client'

import { useState } from "react"

export default function ListaProdutos({ produtos }) {
    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('')

    const produtosFiltrados = produtos.filter(produto => {
        const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase())
        const matchCategoria = categoria ? produto.categoria === categoria : true
        return matchBusca && matchCategoria
    })

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
        </div>
    )
}