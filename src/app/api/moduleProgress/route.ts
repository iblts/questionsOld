import { NextRequest } from 'next/server'
import { getUserId } from '../../../../lib/auth.service'
import prisma from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const userId = getUserId(request) as string

	const moduleProgress = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: data.moduleId,
			userId,
		},
	})

	if (moduleProgress)
		return Response.json({ message: 'Module progress already exist' })

	const createdModule = await prisma.moduleProgress.create({
		data,
	})

	return Response.json(createdModule)
}
