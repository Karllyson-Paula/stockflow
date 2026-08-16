import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar';


export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    return (
        <div>
            <nav>
                <Navbar nome={session.user.name}/>
            </nav>
            {children}
        </div>
    )
}