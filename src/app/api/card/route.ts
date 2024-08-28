import { Card } from '@prisma/client'
import { NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'


export async function GET() {
	const card = await prisma.card.findMany()

	return Response.json({ card })
}

export async function POST(request: NextRequest) {
	if (!request.body) {
		throw new Error('No response body')
	}

	const data = await request.json()

	if (!data) throw new Error()

	try {
		const curModule = await prisma.module.findFirst({
			where: {
				id: data.moduleId,
			},
		})

		if (!curModule) throw new Error("Module doesn't eхist")

		const card = Array.isArray(data)
			? await prisma.card.createMany({
					data,
			  })
			: await prisma.card.create({
					data,
			  })

		if (!card) throw new Error()

		return Response.json({ card })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}

export async function PUT(request: NextRequest) {
	const data: Card = await request.json()

	try {
		const cards = await prisma.card.updateMany({
			where: {
				moduleId: data.moduleId,
			},
			data,
		})

		if (!cards) throw new Error()

		return Response.json({ cards })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}
