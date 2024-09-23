import { verify } from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const token = request.headers.get('Authorization')

	if (!token) return Response.json({ message: 'no token' })

	const userId = verify(token, process.env.SECRET_KEY!).id

	const moduleProgress = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: data.moduleId,
			userId,
		},
	})

	if (moduleProgress)
		return Response.json({ message: 'Module progress already exist' })

	const module = await prisma.moduleProgress.create({
		data,
	})

	return Response.json(module)
}
