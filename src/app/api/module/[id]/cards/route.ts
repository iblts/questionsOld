import type { Card } from '@prisma/client'
import type { NextRequest } from 'next/server'
import prisma from '../../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id
	let stage: number = +request.nextUrl.searchParams.get('stage')!

	if (stage && !isNaN(+stage)) {
		stage = +stage
	} else {
		stage = 3
	}

	const cards = await prisma.cardProgress.findMany({
		where: {
			moduleId: id,
			stage: {
				lt: stage,
			},
		},
		include: {
			card: true,
		},
	})

	return Response.json(cards || [])
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const data: Card = await request.json()

	const moduleId = params.id

	try {
		const cards = await prisma.card.updateMany({
			where: {
				moduleId,
			},
			data,
		})

		if (!cards) throw new Error()

		return Response.json({ cards })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}
