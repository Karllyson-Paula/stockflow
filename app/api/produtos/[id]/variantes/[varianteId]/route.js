import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
    const { varianteId } = await params

    const variante = await prisma.variante.findUnique({
        where: { id: Number(varianteId) }
    })

    if (!variante) {
        return NextResponse.json({ erro: 'Produto não encontrado'}, { status: 404 })
    }

    await prisma.variante.delete({ where: {id: Number(varianteId)}})

    return new NextResponse(null, {status: 204})
}