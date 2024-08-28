import { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const card = await prisma.card.findFirst({
		where: {
			id,
		},
	})

	return Response.json({ card })
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	try {
		const card = await prisma.card.delete({
			where: {
				id,
			},
		})

		if (!card) throw new Error()

		return Response.json({ card })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const data = await request.json()

	if (!data) throw new Error()

	try {
		const card = await prisma.card.update({
			where: {
				id,
			},
			data,
		})

		if (!card) throw new Error()

		return Response.json({ card })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}
