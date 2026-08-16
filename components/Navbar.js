'use client'

import { signOut } from 'next-auth/react'

export default function Navbar({ nome }) {
    return (
        <div>
            <span> {nome} </span>
            <button onClick={() => signOut({ callbackUrl: '/login' })}> Sair </button>
        </div>
    )
}