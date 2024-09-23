import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function POST(req: NextRequest) {
	const { name, password } = await req.json()

	try {
		const user = await prisma.user.findFirst({
			where: {
				name,
			},
		})

		if (!user) throw new Error("User doesn't exist")

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) throw new Error('Not valid password')

		const token = sign(
			{
				id: user.id,
			},
			`${process.env.SECRET_KEY}`,
			{
				expiresIn: '30d',
			}
		)

		return Response.json({ ...user, token })
	} catch (error) {
		console.log(error)
	}
}
