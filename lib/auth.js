import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                const usuario = await prisma.usuario.findUnique({
                    where: { email: credentials.email}
                })

                if (!usuario) return null

                const senhaCorreta = await bcrypt.compare(
                    credentials.password,
                    usuario.senha
                )

                if (!senhaCorreta) return null

                return {
                    id: usuario.id,
                    name: usuario.nome,
                    email: usuario.email,
                    role: usuario.role,
                    negocioId: usuario.negocioId
                }
            }
        })
    ],

    callbacks: {
            async jwt({ token, user }) {
        if (user) {
            token.id = user.id
            token.role = user.role
            token.negocioId = user.negocioId
            token.nome = user.name
        }
        return token
    },

    async session({ session, token }) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.negocioId = token.negocioId
        session.user.nome = token.name
        return session
    }
    },

    pages: {
        signIn: '/login'
    }

}