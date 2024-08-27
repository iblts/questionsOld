import type { ReactNode } from 'react'
import styles from './Form.module.scss'

export default function InputGroup({ children }: { children: ReactNode[] }) {
	return <div className={styles.group}>{children}</div>
}
