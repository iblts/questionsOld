import { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const curModule = await prisma.module.findFirst({
		where: {
			id,
		},
		include: {
			cards: true,
		},
	})

	return Response.json({ module: curModule })
}

export async function DELETE(request: NextRequest) {
	const data = await request.json()

	if (!data) throw new Error()

	try {
		const deletedModule = await prisma.module.delete({
			where: {
				id: data.id,
			},
		})

		if (!deletedModule) throw new Error()
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
		const updatedModule = await prisma.module.update({
			where: {
				id,
			},
			data,
		})

		if (!updatedModule) throw new Error()

		return Response.json({ module })
	} catch (error) {
		throw new Error(`Error: ${error}`)
	}
}
