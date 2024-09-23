import { verify } from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	const token = request.headers.get('Authorization')

	if (!token) return Response.json({ message: 'no token' })

	const userId = verify(token, process.env.SECRET_KEY!).id

	const modules = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: id,
			userId,
		},
		include: {
			module: {
				include: {
					cards: true,
				},
			},
			CardProgress: {
				include: {
					card: true,
				},
			},
		},
	})

	return Response.json(modules)
}
