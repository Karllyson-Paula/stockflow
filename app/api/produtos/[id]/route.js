import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const { id } = await params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
        include: { atributos: true }
    })

    if (!produto) {
        return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404})
    }

    return NextResponse.json(produto)
}

export async function PUT(request, { params }) {
    const { id } = params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id)},
        include: { atributos: true}
    })

    if (!produto) {
        return NextResponse.json({ erro: 'produto não encontrado'}, { status: 404})
    }

    const dados = await request.json()
    const { nome, quantidade, precoVenda, atributos } = dados

    const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
            ...(nome && {nome}),
            ...(quantidade && {quantidade}),
            ...(precoVenda && {precoVenda}),
            ...(atributos && {atributos})
        }
    })

    return NextResponse.json(produtoAtualizado)
}

export async function DELETE(request, { params }) {
    const { id } = params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id)},
        include: { atributos: true}
    })

    if (!produto) {
        return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404})
    }

    await prisma.produto.delete({ where: {id: Number(id)}})

    return new NextResponse(null, {status: 204})
}