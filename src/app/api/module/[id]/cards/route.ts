import type { Card } from '@prisma/client'
import type { NextRequest } from 'next/server'
import prisma from '../../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id
	const stage = request.nextUrl.searchParams.get('stage')

	if (stage && !isNaN(+stage)) {
		const cards = await prisma.card.findMany({
			where: {
				moduleId: id,
				stage: {
					lt: +stage,
				},
			},
		})

		return Response.json(cards || [])
	}

	const cards = await prisma.card.findMany({
		where: {
			moduleId: id,
			stage: {
				lt: 3,
			},
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
