import { deepParseJson } from 'deep-parse-json'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { replaceCard, setCards } from '../../../slices/moduleSlice'
import { ICard } from '../../../types/module'
import Plus from '../../icons/Plus'
import styles from './EditCardPopup.module.scss'

export default function EditCardPopup({
	card,
	onClose,
	setCardState,
}: {
	card: ICard
	onClose: Dispatch<SetStateAction<boolean>>
	setCardState: Dispatch<SetStateAction<ICard[] | undefined>>
}) {
	const dispatch = useAppDispatch()
	const cards = useAppSelector(state => state.module.cards)
	const curCard = cards.find((el: ICard) => el.id === card.id)
	const onSave = () => {
		localStorage.setItem('cards', JSON.stringify(cards))
		setCardState(cards)
		onClose(false)
	}

	useEffect(() => {
		if (localStorage.getItem('cards')) {
			dispatch(setCards(deepParseJson(localStorage.getItem('cards'))))
		}
	}, [])

	return (
		<div
			className={styles.overlay}
			onClick={e => {
				onClose(false)
				e.stopPropagation()
			}}
		>
			<div className={styles.body} onClick={e => e.stopPropagation()}>
				<div className={styles.close} onClick={() => onClose(false)}>
					<Plus fill='#fff' width={40} />
				</div>
				<h2>Edit</h2>
				<div className={styles.inputs}>
					<input
						type='text'
						name='termin'
						id='termin'
						value={curCard?.termin}
						onChange={e =>
							dispatch(replaceCard({ ...card, termin: e.target.value }))
						}
					/>
					<input
						type='text'
						name='definition'
						id='definition'
						value={curCard?.definition}
						onChange={e =>
							dispatch(replaceCard({ ...card, definition: e.target.value }))
						}
					/>
				</div>
				<div className={styles.buttons}>
					<button onClick={() => onClose(false)}>Отменить</button>
					<button onClick={onSave}>Сохранить</button>
				</div>
			</div>
		</div>
	)
}
