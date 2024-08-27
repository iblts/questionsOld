'use client'

import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
import styles from './ModuleInfo.module.scss'

export default function ModuleInfo({ id }: { id: number }) {
	return (
		<div className={styles.body}>
			<Label>
				<Input />
			</Label>
		</div>
	)
}
