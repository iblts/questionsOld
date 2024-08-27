import { NextApiRequest } from 'next'
import { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextApiRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const module = await prisma.module.findFirst({
		where: {
			id,
		},
		include: {
			cards: true,
		},
	})

	return Response.json({ module })
}

export async function DELETE(request: NextRequest) {
	const data = await request.json()

	if (!data) throw new Error()

	try {
		const module = await prisma.module.delete({
			where: {
				id: data.id,
			},
		})

		if (!module) throw new Error()
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}

	return Response.json({ module })
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const data = await request.json()

	if (!data) throw new Error()

	try {
		const module = await prisma.module.update({
			where: {
				id,
			},
			data,
		})

		if (!module) throw new Error()

		return Response.json({ module })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}
