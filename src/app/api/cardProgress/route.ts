import { verify } from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const token = request.headers.get('Authorization')

	if (!token) return Response.json({ message: 'no token' })

	const userId = verify(token, process.env.SECRET_KEY!).id

	const moduleProgress = await prisma.moduleProgress.findFirst({
		where: {
			id: data.moduleId,
			userId,
		},
	})

	if (moduleProgress)
		return Response.json({ message: 'Module progress already exist' })

	const cards = await prisma.cardProgress.createMany({
		data,
	})

	return Response.json(cards)
}

export async function PUT(request: NextRequest) {
	const data = await request.json()

	const cards = await prisma.cardProgress.updateMany({
		data,
	})

	return Response.json(cards)
}
