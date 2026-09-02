'use client'

import { useState } from 'react'
import ListaProdutos from './ListaProdutos';

export default function CarrinhoSaida({ produtos, onFechar, onConfirmar }) {
    const [carrinho, setCarrinho] = useState({})

    const adicionar = (varianteId, estoqueMax) => {
        const atual = carrinho[varianteId] || 0
        if (atual >= estoqueMax) return
        setCarrinho({ ...carrinho, [varianteId]: atual + 1 })
    }

    const remover = (varianteId) => {
        const atual = carrinho[varianteId] || 0
        if (atual <= 0) return
        setCarrinho({ ...carrinho, [varianteId]: atual - 1 })
    }

    const confirmar = async () => {
        const itens = Object.entries(carrinho)
            .filter(([_, qtd]) => qtd > 0)
            .map(([varianteId, quantidade]) => ({
                varianteId: Number(varianteId),
                quantidade
            }))

            if (itens.length === 0) return

            const res = await fetch('/api/vendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ itens })
            })

            if (res.ok) {
                onConfirmar()
            }
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
            <div className="bg-white w-80 flex flex-col">
                <div className="flex justify-between p-4 border-b">
                    <span>Carrinho</span>
                    <button onClick={onFechar}>x</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {produtos.map(produto => (
                        <div key={produto.id}>
                            <p>{produto.nome}</p>
                            {produto.variantes.map(variante => (
                                <div key={variante.id}>
                                    <span>{variante.tamanho} . {variante.cor}   </span>
                                    <button onClick={() => remover(variante.id)}>-</button>
                                    <span>{carrinho[variante.id] || 0}</span>
                                    <button onClick={() => adicionar(variante.id, variante.quantidade)}>+</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <p className="text-xs text-gray-400 mb-3">
                        {Object.values(carrinho).reduce((acc, q) => acc + q, 0)} itens selecionados
                    </p>
                    <button 
                    onClick={confirmar}
                    className="w-full bg-gray-900 text-white text-sm py-2 rounded"
                    >

                        Confirmar saída
                    </button>
                </div>
            </div>
        </div>
    )
}