import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const { id } = await params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
        include: { variantes: true }
    })

    if (!produto) {
        return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404})
    }

    return NextResponse.json(produto)
}

export async function PUT(request, { params }) {
    const { id } = await params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id)},
        include: { variantes: true}
    })

    if (!produto) {
        return NextResponse.json({ erro: 'produto não encontrado'}, { status: 404})
    }

    const dados = await request.json()
    const { nome, categoria, marca, precoVenda, variantes } = dados

    const produtoAtualizado = await prisma.produto.update({
    where: { id: Number(id) },
    data: {
        ...(nome && { nome }),
        ...(categoria && { categoria }),
        ...(marca && { marca }),
    }
})

// atualiza cada variante individualmente
if (variantes) {
    for (const v of variantes) {
        await prisma.variante.update({
            where: { id: v.id },
            data: {
                tamanho: v.tamanho,
                cor: v.cor,
                genero: v.genero,
                tecido: v.tecido,
                precoCusto: parseFloat(v.precoCusto),
                precoVenda: v.precoVenda ? parseFloat(v.precoVenda) : null,
                quantidade: Number(v.quantidade)
            }
        })
    }
}

return NextResponse.json(produtoAtualizado)
}