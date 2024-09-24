import { NextRequest } from 'next/server'
import { getUserId } from '../../../../lib/auth.service'
import prisma from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const userId = getUserId(request) as string

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
