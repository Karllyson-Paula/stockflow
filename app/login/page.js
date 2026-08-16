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
        <div>
            <h2> {aba === 'login' ? 'Login' : 'Cadastro'} </h2>

            <div style={{ display: 'flex', gap: '8px', margin: '8px 0'}}>
                <button onClick={() => setAba('login')}> Login </button>
                <button onClick={() => setAba('cadastro')}> Cadastro </button>
            </div>

            <form onSubmit={aba === 'login' ? handleLogin : handleCadastro}>
                {aba === 'cadastro' && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </div>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Aguarde...' : aba === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}