'use client'

import Image from 'next/image'
import { useState, type ChangeEventHandler } from 'react'
import styles from './Form.module.scss'

export default function InputPassword({
	value,
	onChange,
	placeholder,
	required,
	minLength,
	maxLength,
}: {
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	required?: boolean
	minLength?: number
	maxLength?: number
}) {
	const [errorMessage, setErrorMessage] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const checkPassword = (text: string) => {
		if (text.trim() === '' && required) {
			setErrorMessage('Поле не может быть пустым')
		} else if (minLength && minLength > text.length) {
			setErrorMessage(`Пароль не может быть короче ${minLength} символов`)
		} else if (maxLength && maxLength < text.length) {
			setErrorMessage(`Пароль не может быть длинее ${maxLength} символов`)
		} else {
			setErrorMessage('')
		}
	}

	return (
		<>
			<div className={styles.password}>
				<input
					type={showPassword ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					onBlur={e => checkPassword(e.target.value)}
				/>

				<Image
					src={showPassword ? '/eye-slash.svg' : '/eye.svg'}
					alt='show password'
					width={20}
					height={20}
					onClick={() => setShowPassword(prev => !prev)}
				/>
			</div>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</>
	)
}
