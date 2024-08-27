import { useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { createCard } from '../../../slices/moduleSlice'
import Plus from '../../icons/Plus'
import styles from './ImportCardsPopup.module.scss'

export default function ImportCardsPopup({
	onClose,
	moduleId,
}: {
	onClose: () => void
	moduleId: number
}) {
	const dispatch = useAppDispatch()

	const handleImport = () => {
		const pairs = importValue.split('\n')

		console.log(pairs)

		pairs.forEach(pair => {
			if (pair.length !== 0)
				dispatch(
					createCard({
						moduleId,
						card: {
							termin: pair.split('\t')[0],
							definition: pair.split('\t')[1],
						},
					})
				)
		})
		onClose()
	}

	const [importValue, setImportValue] = useState('')
	return (
		<div
			className={styles.overlay}
			onClick={e => {
				onClose()
				e.stopPropagation()
			}}
		>
			<div className={styles.body} onClick={e => e.stopPropagation()}>
				<div className={styles.close} onClick={onClose}>
					<Plus fill='#fff' width={40} />
				</div>
				<h2>Edit</h2>
				<textarea
					value={importValue}
					onChange={e => setImportValue(e.target.value)}
					className={styles.text}
				/>
				<div className={styles.buttons}>
					<button onClick={onClose}>Отменить</button>
					<button onClick={handleImport}>Импортировать</button>
				</div>
			</div>
		</div>
	)
}
