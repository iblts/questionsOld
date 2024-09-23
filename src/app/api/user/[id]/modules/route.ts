import { NextRequest } from 'next/server'
import prisma from '../../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const userId = params.id

	const user = await prisma.module.findFirst({
		where: {
			authorId: userId,
		},
	})

	return Response.json(user)
}
