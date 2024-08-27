'use client'

import { FormEventHandler, type ReactNode } from 'react'
import styles from './Form.module.scss'

export default function Form({
	children,
	onSubmit,
}: {
	children: ReactNode
	onSubmit?: FormEventHandler<HTMLFormElement>
}) {
	return (
		<form
			className={styles.form}
			onSubmit={e => {
				e.preventDefault()
				onSubmit?.(e)
			}}
		>
			{children}
		</form>
	)
}
