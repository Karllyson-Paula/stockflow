'use client'

import { signOut } from 'next-auth/react'

export default function Navbar({ nome }) {
    return (
        <div className="border-b border-gray-200 px-4 h-12 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900"> {nome} </span>
            <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-gray-400 hover:text-gray-600"
            > 
            
            Sair 
            </button>
        </div>
    )
}