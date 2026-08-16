import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    const negocios = await prisma.negocio.findMany({
        include: {
            produtos: true,
            usuarios: true
        }
    })

    if (!negocios) {
        return NextResponse.json([])
    }

    return NextResponse.json(negocios)
}

export async function POST(request) {
    const dados = await request.json()
    const { nome, segmento, alertaMin } = dados

    if (!nome) {
        return NextResponse.json( {erro: 'Nome é obrigatório'}, { status: 400})
    }

    if (!segmento) {
        return NextResponse.json({ erro: 'Segmento é obrigatório'}, { status: 400})
    }

    const novoNegocio = await prisma.negocio.create({
        data: {
            nome,
            segmento,
            alertaMin
        }
    })

    return NextResponse.json(novoNegocio, { status: 201})
}