import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import ListaProdutos from '@/components/ListaProdutos';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    const produtos = await prisma.produto.findMany({
        where: { negocioId: session.user.negocioId },
        include: { variantes: true },
        orderBy: { nome: 'asc' }
        
    })

    const negocio = await prisma.negocio.findUnique({
        where: { id: session.user.negocioId }
    })

    const variantesEstoqueBaixo = produtos.flatMap(p =>
        p.variantes.filter(v => v.quantidade <= negocio.alertaMin)
    )
        return (
            <div className="max-w-2x1 mx-auto px-4 py-6">
                {variantesEstoqueBaixo.length > 0 && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                            <p className="font medium mb-1"> ⚠️ {variantesEstoqueBaixo.length} Produto(s) com estoque abaixo de {negocio.alertaMin} unidades: </p>
                            {produtos.flatMap(p => 
                                p.variantes
                                    .filter(v => v.quantidade <= negocio.alertaMin)
                                    .map(v => (
                                        <p key={v.id} className="text-xs">
                                            • {p.nome} - {v.tamanho} . {v.cor} . Qtd: {v.quantidade}
                                        </p>
                                    ))
                            )}
                        </div>
                    )}
                <div className="flex items-baseline justify-between mb-6">
                    <h1 className="text-lg font-medium text-gray-900">
                        Olá, {session.user.name}
                    </h1>
                    <Link href="/dashboard/produtos/novo"
                    className="text-sm text-gray-500 border border-gray-200 rounded px-3 py-1.5 hover:border-gray-400"
                    >
                        + Novo produto
                    </Link>
                </div>

                {produtos.length === 0 ? (
                    <p className="text-sm text-gray-400">Nenhum produto cadastrado</p>
                ) : (
                    <ListaProdutos produtos={produtos} />
                )}
            </div>
        )
    
}