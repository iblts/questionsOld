import classNames from 'classnames'
import { ReactNode } from 'react'
import Plus from '../icons/Plus'
import styles from './Modal.module.scss'

export default function Modal({
	onClose,
	children,
	classname,
}: {
	onClose: () => void
	children: ReactNode
	classname?: string
}) {
	return (
		<div
			className={styles.overlay}
			onClick={e => {
				onClose()
				e.stopPropagation()
			}}
		>
			<div
				className={classNames(classname, styles.body)}
				onClick={e => e.stopPropagation()}
			>
				<span className={styles.close} onClick={onClose}>
					<Plus fill='#000' width={40} />
				</span>
				{children}
			</div>
		</div>
	)
}
