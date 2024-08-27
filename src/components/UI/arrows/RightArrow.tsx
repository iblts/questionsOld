import { Dispatch, SetStateAction } from 'react'
import Arrow from '../../icons/Arrow'
import styles from './Arrow.module.scss'

export default function RightArrow({
	index,
	length,
	setCurrentCardIndex,
}: {
	index: number
	length: number
	setCurrentCardIndex: Dispatch<SetStateAction<number>>
}) {
	return (
		<button
			className={`${styles.body} ${index === length - 1 && styles.disabled}`}
			onClick={() => {
				if (index === length - 1) return
				setCurrentCardIndex((prev: number) => prev + 1)
			}}
		>
			<Arrow />
		</button>
	)
}
