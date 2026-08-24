'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Login() {
    const router = useRouter()
    const [aba, setAba] = useState('login')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErro('')

        const res = await signIn('credentials', {
            email,
            password: senha,
            redirect: false
        })

        if (res?.error) {
            setErro('Credenciais inválidas')
        } else {
            router.push('/dashboard')
        }
    }

    const handleCadastro = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErro('')

        const res = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, negocioId: 1 })
        })

        const dados = await res.json()

        if (dados.id) {
            const loginRes = await signIn('credentials', {
                email,
                password: senha,
                redirect: false
            })

            if (!loginRes?.error) {
                router.push('/dashboard')
            }
        } else {
            setErro(dados.erro || 'Erro ao cadastrar')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-x1 font-medium text-gray-900 mb-1">StockFlow</h1>
                <p className="text-sm text-gray-400 mb-6">Projeto Neves</p>

                <div className="flex gap-4 mb-6 border-b border-gray-100">
                    <button
                     onClick={() => setAba('login')}
                     className={`text-sm pb-2 ${aba === 'login' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}
                    >

                        Login
                    </button>
                    <button
                     onClick={() => setAba('cadastro')}
                     className={`text-sm pb-2 ${aba === 'cadastro' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}
                    >

                        Cadastro
                    </button>
                </div>

                <form onSubmit={aba === 'login' ? handleLogin : handleCadastro} className="flex flex-col gap-3">
                    {aba === 'cadastro' && (
                        <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="text-sm px-3 py-2 border-gray-200 rounded focus:outline-none focus:border-gray-400"
                        />
                    )}
                    <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="text-sm px-3 py-2 border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                    <input
                    type="password"
                    placeholder="Senha"
                    onChange={e => setSenha(e.target.value)}
                    className="text-sm px-3 py-2 border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                    {erro && <p className="text-xs text-red-400">{erro}</p>}
                    <button
                     type="submit"
                     disabled={loading}
                     className="text-sm bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                        {loading ? 'Aguarde...' : aba === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}