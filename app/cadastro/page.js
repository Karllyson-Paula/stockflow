    'use client'

    import { useState } from "react"

    export default function Cadastro() {
        const [nome, setNome] = useState('')
        const [email, setEmail] = useState('')
        const [senha, setSenha] = useState('')

        const [nomeNegocio, setNomeNegocio] = useState('')
        const [segmento, setSegmento] = useState('')
        const [alertaMin, setAlertaMin] = useState(5)

        const [loading, setLoading] = useState(false)
        const [erro, setErro] = useState(null)

        const handleCadastro = async (e) => {
                e.preventDefault()
                setLoading(true)
                setErro('')

                const negocio = await fetch('/api/negocios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ nome: nomeNegocio, segmento, alertaMin })

                })

                const res = await negocio.json()
                if (!negocio.ok) {
                    setErro(res.erro)
                    setLoading(false)
                    return
                }   else {
                    const usuario = await fetch('api/usuarios', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({ nome, senha, email, negocioId: res.id})
                    })

                    const dados = await usuario.json()

                    if (!usuario.ok) {
                        setErro(dados.erro)
                    } else {
                        return
                    }
                }
                } 

                
        }

        
        
    