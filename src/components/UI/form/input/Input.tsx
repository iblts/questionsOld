import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import styles from './Input.module.scss'

export default function Input({
	type,
	value,
	onChange,
	placeholder,
	onBlur,
	name,
	required,
	minLength,
	maxLength,
}: {
	type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	onBlur?: FocusEventHandler<HTMLInputElement>
	name?: string
	required?: boolean
	minLength?: number
	maxLength?: number
}) {
	const [errorMessage, setErrorMessage] = useState('')

	const checkPassword = (text: string) => {
		if (text.trim() === '' && required) {
			setErrorMessage('Поле не может быть пустым')
		} else if (minLength && minLength > text.length) {
			setErrorMessage(`Никнейм не может быть короче ${minLength} символов`)
		} else if (maxLength && maxLength < text.length) {
			setErrorMessage(`Никнейм не может быть длинее ${maxLength} символов`)
		} else {
			setErrorMessage('')
		}
	}

	return (
		<>
			<input
				className={styles.body}
				value={value}
				onChange={onChange}
				type={type}
				placeholder={placeholder}
				onBlur={e => {
					onBlur?.(e)
					checkPassword(e.target.value)
				}}
				name={name}
			/>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</>
	)
}
