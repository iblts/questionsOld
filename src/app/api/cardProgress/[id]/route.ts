import type { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	const card = await prisma.cardProgress.findFirst({
		where: {
			id,
		},
	})

	return Response.json(card)
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	const card = await prisma.cardProgress.update({
		where: {
			id,
		},
		data: await request.json(),
	})

	return Response.json(card)
}
