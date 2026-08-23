import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import ListaProdutos from '@/components/ListaProdutos';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    const produtos = await prisma.produto.findMany({
        where: { negocioId: session.user.negocioId },
        include: { variantes: true }
        
    })
        return (
            <div>
                <h1>
                    <p> Bem vindo {session.user.name}! </p>
                    
                        <Link href={"/dashboard/produtos/novo"}>Novo Produto</Link>
                </h1>

                <div>
                    {produtos.length === 0 ? (
                        <p>Nenhum produto cadastrado.</p>
                    ) : (<ListaProdutos produtos={produtos}/>)}
                </div>
            </div>
            
        )
    
}