'use client'

import Button from '@/components/UI/button/Button'
import Form from '@/components/UI/form/Form'
import InputPassword from '@/components/UI/form/InputPassword'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
import register from '@/service/login'
import { useAuthStore } from '@/store/authStore'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Form.module.scss'

export default function RegisterForm() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [secondPassword, setSecondPassword] = useState('')
	const router = useRouter()

	const { signIn } = useAuthStore()

	const handleSubmit = async () => {
		if (password !== secondPassword) {
			toast.error('Пароль должен совпадать')
			return
		}

		await register(name, password)

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
					placeholder='Введите ваш никнейм'
					required
					minLength={3}
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</Label>
			<Label>
				Пароль
				<InputPassword
					placeholder='Введите свой пароль'
					required
					minLength={6}
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</Label>
			<Label>
				Повторите пароль
				<InputPassword
					placeholder='Введите свой пароль'
					required
					minLength={6}
					value={secondPassword}
					onChange={e => setSecondPassword(e.target.value)}
				/>
			</Label>
			<Button className={styles.btn}>Зарегистрироваться</Button>
		</Form>
	)
}
