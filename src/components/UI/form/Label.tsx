import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './Form.module.scss'

export default function Label({
	children,
	flex,
}: {
	children: ReactNode
	flex?: boolean
}) {
	return (
		<label className={classNames(styles.lable, flex && styles.flex)}>
			{children}
		</label>
	)
}
