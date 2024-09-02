import cookies from 'js-cookie'

export default async function register(name: string, password: string) {
	try {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, password }),
		})

		if (!res.ok) throw new Error('failed to response login')

		const user = await res.json()

		if (!user) throw new Error("User doesn't register")

		cookies.set('token', user.token, { secure: true })

		return user
	} catch (error) {
		console.log(error)
		return new Error(JSON.stringify(error) || 'Error in login')
	}
}
