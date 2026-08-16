'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function NovoProduto() {
    const router = useRouter()
    const { data: session } = useSession()
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [precoCusto, setPrecoCusto] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState(null)

    const handleCriar = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, quantidade, precoCusto, precoVenda, negocioId: session?.user?.negocioId })
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
                placeholder='Quantidade'
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
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
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}