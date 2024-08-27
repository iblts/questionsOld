import classNames from 'classnames'
import type { MatchQuestion } from '../../../types/question'
import styles from './MatchCard.module.scss'

export default function MatchCard({
	card,
	selected,
	answered,
	select,
}: {
	card: MatchQuestion
	selected: MatchQuestion[]
	answered: string[]
	select: () => void
}) {
	return (
		<button
			className={classNames(
				styles.card,
				selected.includes(card) && styles.active,
				answered.includes(card.cardId) && styles.invisible
			)}
			onClick={select}
		>
			{card.text}
		</button>
	)
}
