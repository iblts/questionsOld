'use client'

import SignInBtn from '@/components/signInBtn/SignInBtn'
import SignOutBtn from '@/components/signOutBtn/SignOutBtn'
import { useAuthStore } from '@/store/authStore'

export default function AuthButton() {
	const { isAuth } = useAuthStore()

	return <>{!isAuth ? <SignInBtn /> : <SignOutBtn />}</>
}
