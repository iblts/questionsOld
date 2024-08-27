'use client'

import { useState, type ChangeEventHandler } from 'react'
import styles from './Form.module.scss'
import Input from './input/Input'

export default function Email({
	value,
	onChange,
	placeholder,
	required,
}: {
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	required?: boolean
}) {
	const [errorMessage, setErrorMessage] = useState('')

	const checkEmail = (text: string) => {
		if (text.trim() === '' && required) {
			setErrorMessage('Поле не может быть пустым')
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)) {
			setErrorMessage('Неверный формат почты')
		} else {
			setErrorMessage('')
		}
	}

	return (
		<>
			<Input
				type='email'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				onBlur={e => checkEmail(e.target.value)}
			/>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</>
	)
}
