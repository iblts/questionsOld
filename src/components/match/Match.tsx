'use client'

import Loading from '@/app/module/[id]/match/loading'
import type { MatchQuestion } from '@/types/question'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../UI/button/Button'
import styles from './Match.module.scss'
import MatchCard from './card/MatchCard'

export default function Match({ matchCards }: { matchCards: MatchQuestion[] }) {
	const [selected, setSelected] = useState<MatchQuestion[]>([])
	const [answered, setAnswered] = useState<string[]>([])
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const handleSelect = (card: MatchQuestion) => {
		if (selected.length === 1) {
			if (selected[0].cardId === card.cardId) {
				setAnswered(prev => [...prev, selected[0].cardId])
			}
			setSelected([])
		} else {
			setSelected(prev => [...prev, card])
		}
	}

	const handleRefresh = () => {
		router.refresh()
		setLoading(true)
		setTimeout(() => {
			setAnswered([])
			setSelected([])
			setLoading(false)
		}, 1000)
	}

	return loading ? (
		<Loading />
	) : (
		<div className={styles.body}>
			{answered.length === matchCards.length / 2 ? (
				<Button onClick={handleRefresh}>Заново</Button>
			) : (
				matchCards.map(card => (
					<MatchCard
						key={card.cardId + card.text}
						card={card}
						selected={selected}
						answered={answered}
						select={() => handleSelect(card)}
					/>
				))
			)}
		</div>
	)
}
