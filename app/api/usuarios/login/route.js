import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
    const dados = await request.json()
    const { email, senha } = dados

    if (!email || !senha) {
        return NextResponse.json({ erro: 'Email e senha são obrigatórios para fazer login'}, { status: 400})
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
        return NextResponse.json({ erro: 'Credenciais inválidas' }, { status: 401})
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
        return NextResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 })
    }

    return NextResponse.json(login)
}