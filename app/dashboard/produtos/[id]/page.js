import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import FormEditarProduto from '@/components/FormEditarProduto'

export default async function EditarProduto({ params }) {
    const { id } = await params

    const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
        include: { variantes: true }
    })
    
    if (!produto) {
        return <p> Produto não encontrado </p>
    } 

    return (
        <div>
            <FormEditarProduto produto={produto} />
        </div>
    )
}