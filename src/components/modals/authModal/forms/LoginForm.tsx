'use client'

import Button from '@/components/UI/button/Button'
import Form from '@/components/UI/form/Form'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from './Form.module.scss'

export default function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			const res = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!res?.ok) {
				throw Error()
			}

			const toast = await import('react-hot-toast').then(mod => mod.toast)
			toast.success('Вы вошли в аккаунт')
		} catch (e) {
			console.error('Error:', e)
			const toast = await import('react-hot-toast').then(mod => mod.toast)
			toast.error('Пройдите капчу!')
		}
	}

	return (
		<Form onSubmit={() => onSubmit({ email, password })}>
			<Form.Label>
				Email
				<Form.Input
					type='text'
					value={email}
					placeholder='mail@gmail.com'
					onChange={e => setEmail(e.target.value)}
				/>
			</Form.Label>
			<Form.Label>
				Пароль
				<Form.Input
					type='password'
					value={password}
					placeholder='Введите свой пароль'
					onChange={e => setPassword(e.target.value)}
				/>
			</Form.Label>
			<Button className={styles.btn}>Войти</Button>
		</Form>
	)
}
