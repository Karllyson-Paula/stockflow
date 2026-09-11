'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'




export default function FormEditarProduto({ produto }) {
    const router = useRouter()
    const [nome, setNome] = useState(produto.nome)
    const [categoria, setCategoria] = useState(produto.categoria)
    const [marca, setMarca] = useState(produto.marca)
    const [variantes, setVariantes] = useState(produto.variantes)
    const [erro, setErro] = useState(null)

    // Aí eu teria mais menos uma estrutura parecida com isso ou eu to brisando?

    const atualizarVariante = (index, campo, valor) => {
        const novas = [...variantes]
        novas[index][campo] = valor
        setVariantes(novas)
}
    const handleAtualizar = async (e) => {
        e.preventDefault()

        const res = await fetch(`/api/produtos/${produto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, categoria, marca, variantes })
        })

        const dados = await res.json()
        if (dados.id) {
            router.push('/dashboard')
        } else {
            setErro('Produto não atualizado')
        }
    }

    

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* A criar ainda, pois o conteúdo do return é mt longo. Vou primeiro validar o esboço do que já tenho */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Editar produto</h2>
                <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="text-sm text-gray-400 hover:text-gray-600"
                >
                     Cancelar 
                </button>
            </div>

            <form onSubmit={handleAtualizar} className="flex flex-col gap-3">
                <input
                    placeholder="Nome do produto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                    placeholder="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                    placeholder="Marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />

                {variantes.map((variante, index) => (
                    <div key={index} className="border border-gray-300 rounded px-3 py-2">
                        <input
                            value={variante.tamanho}
                            placeholder='Tamanho'
                            onChange={(e) => atualizarVariante(index, 'tamanho', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.cor}
                            placeholder='Cor'
                            onChange={(e) => atualizarVariante(index, 'cor', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.genero}
                            placeholder='Genero'
                            onChange={(e) => atualizarVariante(index, 'genero', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.tecido}
                            placeholder='Tecido'
                            onChange={(e) => atualizarVariante(index, 'tecido', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.precoCusto}
                            placeholder='Preço de custo'
                            onChange={(e) => atualizarVariante(index, 'precoCusto', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.precoVenda}
                            placeholder='Preço de venda'
                            onChange={(e) => atualizarVariante(index, 'precoVenda', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        <input
                            value={variante.quantidade}
                            placeholder='Quantidade'
                            onChange={(e) => atualizarVariante(index, 'quantidade', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                ))}
                {erro && <p>{erro} </p>}
                <button type='submit'>Salvar</button>
            </form>
        </div>
    )
}