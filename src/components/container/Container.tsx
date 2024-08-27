import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './Container.module.scss'

export default function Container({
	children,
	className,
	width = 1440,
}: {
	children: ReactNode
	className?: string
	width?: number | string
}) {
	return (
		<div
			className={classNames(styles.container, className)}
			style={{
				maxWidth: width,
			}}
		>
			{children}
		</div>
	)
}
