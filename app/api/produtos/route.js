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
    const { nome, categoria, marca, negocioId, variantes } = dados

    const variantesConvertidas = variantes.map(v => ({
        ...v,
        quantidade: Number(v.quantidade),
        precoCusto: parseFloat(v.precoCusto),
        precoVenda: v.precoVenda ? parseFloat(v.precoVenda) : null
    }))

    const produtoExistente = await prisma.produto.findFirst({
        where: {
            nome,
            categoria,
            negocioId: Number(negocioId)
        }
    })

    if (produtoExistente) {
        const variantesExistentes = await prisma.variante.findMany({
            where: { produtoId: produtoExistente.id }
        })

        for (const v of variantesConvertidas) {
            const duplicada = variantesExistentes.find(e =>
                e.tamanho === v.tamanho &&
                e.cor === v.cor &&
                e.genero === v.genero &&
                e.tecido === v.tecido &&
                e.precoCusto === v.precoCusto &&
                e.precoVenda === v.precoVenda
            )

            if (duplicada) {
                await prisma.variante.update({
                    where: { id: duplicada.id },
                    data: { quantidade: duplicada.quantidade + v.quantidade }
                })
            } else {
                await prisma.variante.create({
                    data: { ...v, produtoId: produtoExistente.id }
                })
            }
        }

        return NextResponse.json(produtoExistente, { status: 201 })
    } else {
        const produto = await prisma.produto.create({
            data: {
                nome,
                categoria,
                marca,
                negocioId: Number(negocioId),
                variantes: {
                    create: variantesConvertidas || []
                }
            },
            include: { variantes: true }
        })
        return NextResponse.json(produto, { status: 201 })
    }
}