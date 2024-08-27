import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './CheckBox.module.scss'

export default function CheckBox({
	children,
	isActive,
}: {
	children: ReactNode
	isActive: boolean
}) {
	return (
		<label className={classNames(styles.body, isActive && styles.active)}>
			{children}
		</label>
	)
}
