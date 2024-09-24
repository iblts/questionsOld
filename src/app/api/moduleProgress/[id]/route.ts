import { NextRequest } from 'next/server'
import { getUserId } from '../../../../../lib/auth.service'
import prisma from '../../../../../lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	const userId = getUserId(request) as string

	const modules = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: id,
			userId,
		},
		include: {
			module: {
				include: {
					cards: true,
				},
			},
			CardProgress: {
				include: {
					card: true,
				},
			},
		},
	})

	return Response.json(modules)
}
