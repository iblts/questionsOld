'use client'

import { useState } from 'react'
import Plus from '../../components/icons/Plus'
import styles from './Create.module.scss'

export default function Create() {
	const [isHover, setHover] = useState(false)

	return (
		<div
			className={styles.create}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Plus fill={isHover ? '#0a092d' : ''} />
		</div>
	)
}
