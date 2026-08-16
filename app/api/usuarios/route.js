import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

const SEGREDO = 'minha-chave-secreta-dev'

export async function POST(request) {
    const dados = await request.json()
    const { nome, email, senha, negocioId } = dados

    if (!nome || !email || !senha) {
        return NextResponse.json({ erro: 'O preenchimento de todos os dados é obrigatório'}, { status: 400 })
    }

    const jaExiste = await prisma.usuario.findUnique({ where: { email } })
    if (jaExiste) {
        return NextResponse.json({ erro: 'Email já cadastrado'}, { status: 400 })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await prisma.usuario.create({
        data: { nome, email, senha: senhaCriptografada, negocioId }
    })

    return NextResponse.json({ mensagem: 'Usuário criado com sucesso', id: usuario.id}, { status: 201})
}