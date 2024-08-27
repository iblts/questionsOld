import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../../../lib/prisma'

import { compare } from 'bcrypt'

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null

				const values = {
					email: credentials.email,
				}

				const user = await prisma.user.findFirst({
					where: values,
				})

				if (!user) return null

				const isValidPssword = await compare(
					credentials.password,
					user.password!
				)

				if (!isValidPssword) return null

				if (!user.emailVerified) return null

				return {
					id: user.id,
					name: user.name,
					email: user.email,
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token }) {
			const user = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (user) {
				token.id = user.id
				token.name = user.name
				token.email = user.email
			}
			return token
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id
			}

			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
