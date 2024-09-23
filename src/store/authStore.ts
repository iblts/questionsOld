import cookies from 'js-cookie'
import { create } from 'zustand'

interface AuthState {
	isAuth: boolean
	signIn: () => void
	signOut: () => void
}

const isAuth = !!cookies.get('token')

export const useAuthStore = create<AuthState>(set => ({
	isAuth,
	signIn: () => set({ isAuth: true }),
	signOut: () => set({ isAuth: false }),
}))
