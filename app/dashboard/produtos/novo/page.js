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
    const [precoCusto, setPrecoCusto] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [variantes, setVariantes] = useState([
        { tamanho: '', cor: '', genero: '', tecido: '', quantidade: 0}
    ])
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState(null)

    const adicionarVariante = () => {
        setVariantes([...variantes, { tamanho: '', cor: '', genero: '', tecido: '', quantidade: 0 }])
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
            body: JSON.stringify({ nome, categoria, marca, precoCusto, precoVenda, variantes, negocioId: session?.user?.negocioId })
        })

        const dados = await res.json()
        if (dados.id) {
            router.push('/dashboard')
        } else {
            setErro('Produto não adicionado')
        }
    }

    return (
        <div>
            <h2>Cadastrar produto</h2>
            <form onSubmit={handleCriar}>
                <input
                placeholder='Nome do produto'
                value={nome}
                onChange={e => setNome(e.target.value)}
                />
                <input
                placeholder='Categoria'
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                />
                <input
                placeholder='Marca'
                value={marca}
                onChange={e => setMarca(e.target.value)}
                />
                <input
                placeholder='Preço de custo'
                value={precoCusto}
                onChange={e => setPrecoCusto(e.target.value)}
                />
                <input
                placeholder='Preço de venda'
                value={precoVenda}
                onChange={e => setPrecoVenda(e.target.value)}
                />
                <div>
                    <h3>Variantes</h3>
                    {variantes.map((variante, index) => (
                        <div key={index}>
                            <input
                            placeholder='Tamanho'
                            value={variante.tamanho}
                            onChange={e => atualizarVariante(index, 'tamanho', e.target.value)}
                            />
                            <input
                            placeholder='Cor'
                            value={variante.cor}
                            onChange={e => atualizarVariante(index, 'cor', e.target.value)}
                            />
                            <input
                            placeholder='Genero'
                            value={variante.genero}
                            onChange={e => atualizarVariante(index, 'genero', e.target.value)}
                            />
                            <input
                            placeholder='Tecido'
                            value={variante.tecido}
                            onChange={e => atualizarVariante(index, 'tecido', e.target.value)}
                            />
                            <input
                            placeholder='Quantidade'
                            value={variante.quantidade}
                            onChange={e => atualizarVariante(index, 'quantidade', e.target.value)}
                            />
                            <button type='button' onClick={() => removerVariante(index)}>🗑️</button>
                        </div>
                    ))}
                    <button type='button' onClick={adicionarVariante}>+ Adicionar variantes</button>
                </div>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}