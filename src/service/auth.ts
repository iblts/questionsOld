import { JwtPayload, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from '../../lib/prisma'

export default async function auth() {
	try {
		const cookieStore = cookies()
		const token = cookieStore.get('token')

		if (!token) throw new Error('No token')

		const decoded = verify(token.value, 'iblts') as JwtPayload

		const userId = decoded.id

		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		})

		if (!user) throw new Error('unknown user')

		return Response.json(user)
	} catch (error) {
		console.log(error)
		return new Error(JSON.stringify(error) || 'Error in registery')
	}
}
