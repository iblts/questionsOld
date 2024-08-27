'use client'

import { useState } from 'react'
import Modal from '../Modal'
import styles from './AuthModal.module.scss'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'

export default function AuthModal({ onClose }: { onClose: () => void }) {
	const [form, setForm] = useState('login')

	return (
		<Modal onClose={onClose} classname={styles.modal}>
			<p className={styles.title}>
				{form === 'login' ? 'Вход' : 'Регистрация'}
			</p>
			{form === 'login' ? (
				<>
					<LoginForm />
					<p className={styles.account}>
						Нет акаунта?{' '}
						<span onClick={() => setForm('register')} className={styles.link}>
							Создайте
						</span>
					</p>
				</>
			) : (
				<>
					<RegisterForm />
					<p className={styles.account}>
						Уже есть акаунт?{' '}
						<span onClick={() => setForm('login')} className={styles.link}>
							Войдите
						</span>
					</p>
				</>
			)}
		</Modal>
	)
}
