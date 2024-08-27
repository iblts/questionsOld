'use client'

import type { Card } from '@prisma/client'
import { useState } from 'react'
import LeftArrow from '../UI/arrows/LeftArrow'
import RightArrow from '../UI/arrows/RightArrow'
import FlashCard from '../card/flashcard/FlashCard'
import styles from './CardsViewer.module.scss'

export default function CardsViewer({ cards }: { cards: Card[] }) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	return (
		<div className={styles.cardsViewer}>
			<FlashCard card={cards[currentCardIndex]} />
			<div className={styles.controlls}>
				<LeftArrow
					index={currentCardIndex}
					setCurrentCardIndex={setCurrentCardIndex}
				/>
				<div className={styles.index}>
					{currentCardIndex + 1} / {cards.length}
				</div>
				<RightArrow
					setCurrentCardIndex={setCurrentCardIndex}
					index={currentCardIndex}
					length={cards.length}
				/>
			</div>
		</div>
	)
}
