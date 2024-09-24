import { verify } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'

export function getUserId(request: NextRequest) {
	const token = request.headers.get('Authorization')

	if (!token) return Response.json({ message: 'no token' })

	const verified = verify(token, process.env.SECRET_KEY!) as { id: string }

	const userId = verified.id

	return userId
}
