'use client'

import Button from '@/components/UI/button/Button'
import Form from '@/components/UI/form/Form'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
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
			<Label>
				Email
				<Input
					type='text'
					value={email}
					placeholder='mail@gmail.com'
					onChange={e => setEmail(e.target.value)}
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
