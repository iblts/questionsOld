import { ChangeEventHandler, FocusEventHandler } from 'react'
import styles from './Input.module.scss'

export default function Input({
	type,
	value,
	onChange,
	placeholder,
	onBlur,
	name,
}: {
	type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	onBlur?: FocusEventHandler<HTMLInputElement>
	name?: string
}) {
	return (
		<input
			className={styles.body}
			value={value}
			onChange={onChange}
			type={type}
			placeholder={placeholder}
			onBlur={onBlur}
			name={name}
		/>
	)
}
