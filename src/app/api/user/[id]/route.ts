import { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	const user = await prisma.user.findFirst({
		where: {
			id,
		},
	})

	return Response.json(user)
}

export async function DELETE(request: NextRequest) {
	const data = await request.json()

	if (!data) throw new Error()

	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id: data.id,
			},
		})

		if (!deletedUser) throw new Error()
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
		const updatedModule = await prisma.user.update({
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
