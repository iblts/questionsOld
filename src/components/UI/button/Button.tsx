import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Button.module.scss'

export default function Button({
	children,
	className,
	variant = 'default',
	onClick,
}: {
	children: ReactNode
	className?: string
	variant?: 'default' | 'outlined'
	onClick?: () => void
}) {
	return (
		<button
			className={classNames(styles.button, className, styles[variant])}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
