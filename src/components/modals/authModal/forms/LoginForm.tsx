'use client'

import Button from '@/components/UI/button/Button'
import Form from '@/components/UI/form/Form'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
import login from '@/service/login'
import { useAuthStore } from '@/store/authStore'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './Form.module.scss'

export default function LoginForm() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const { signIn } = useAuthStore()

	const handleSubmit = async () => {
		await login(name, password)
		if (cookies.get('token')) {
			signIn()
			router.push('/')
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Label>
				Никнейм
				<Input
					type='text'
					value={name}
					placeholder='Введите свой никнейм'
					onChange={e => setName(e.target.value)}
				/>
			</Label>
			<Label>
				Пароль
				<Input
					type='password'
					value={password}
					placeholder='Введите свой пароль'
					onChange={e => setPassword(e.target.value)}
				/>
			</Label>
			<Button className={styles.btn}>Войти</Button>
		</Form>
	)
}
