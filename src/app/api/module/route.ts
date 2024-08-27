import type { NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
	const modules = await prisma.module.findMany({
		include: {
			author: true,
			cards: true,
		},
		where: {
			cards: {
				some: {},
			},
		},
	})

	return Response.json(modules)
}

export async function POST(request: NextRequest) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const data = await request.json()

	if (!data) throw new Error()

	try {
		const module = await prisma.module.create({
			data,
		})
		if (!module) throw new Error()
		return Response.json(module)
	} catch (error) {
		throw new Error(`Неверные поля ${error} body: ${request.body}`)
	}
}
