import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function POST(req: NextRequest) {
	const { name, password: passwordHash } = await req.json()

	try {
		const salt = await bcrypt.genSalt(5)
		const hash = await bcrypt.hash(passwordHash, salt)

		const user = await prisma.user.create({
			data: {
				name,
				password: hash,
			},
		})

		const token = sign(
			{
				id: user.id,
			},
			`${process.env.SECRET_KEY}`,
			{
				expiresIn: '30d',
			}
		)

		const { password, ...userData } = user

		return Response.json({ ...userData, token })
	} catch (error) {
		console.log(error)
	}
}
