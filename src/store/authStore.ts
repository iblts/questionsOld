import cookies from 'js-cookie'
import { create } from 'zustand'

interface BearState {
	isAuth: boolean
	signIn: () => void
	signOut: () => void
}

const isAuth = !!cookies.get('token')

export const useAuthStore = create<BearState>(set => ({
	isAuth,
	signIn: () => set({ isAuth: true }),
	signOut: () => set({ isAuth: false }),
}))
