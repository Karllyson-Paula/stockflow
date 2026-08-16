import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET api/produtos
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const negocioId = searchParams.get('negocioId')

    const produtos = await prisma.produto.findMany({
        where: negocioId ? { negocioId: Number(negocioId) } : {},
        include: { variantes: true },
        orderBy: { criadoEm: 'desc' }
    })

    return NextResponse.json(produtos)
}

// POST api/produtos
export async function POST(request) {
    const dados = await request.json()
    const { nome, categoria, marca, precoCusto, precoVenda, negocioId, variantes } = dados

    const produto = await prisma.produto.create({
        data: {
            nome,
            categoria,
            marca,
            precoCusto: parseFloat(precoCusto),
            precoVenda: parseFloat(precoVenda),
            negocioId: Number(negocioId),
            variantes: {
                create: variantes || []
            }
        },
        include: { variantes: true}
    })

    return NextResponse.json(produto, { status: 201 })
}