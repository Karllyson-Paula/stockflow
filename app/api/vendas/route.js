import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export async function POST(request) {
    const { itens } = await request.json()

    for (const item of itens) {
        const variante = await prisma.variante.findUnique({
            where: { id: item.varianteId}
        })

        if (variante.quantidade < item.quantidade) {
            return NextResponse.json({ erro: 'Estoque insuficiente' }, { status:  400 } )
        }

        await prisma.variante.update({
            where: { id: item.varianteId },
            data: { quantidade: variante.quantidade - item.quantidade }
        })
    }

    return NextResponse.json({ mensagem: 'Venda registrada' }, { status: 201 })
}