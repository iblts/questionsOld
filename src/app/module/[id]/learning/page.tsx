import Container from '@/components/container/Container'
import Learning from '@/components/learning/Learning'
import {
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/types/question'
import type { Card } from '@prisma/client'
import styles from './page.module.scss'

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params

	const response = await fetch(`${process.env.API_URL}/module/${id}/cards`, {
		cache: 'no-cache',
	})

	if (!response.ok) return

	const cards: Card[] = await response.json()

	const resetStage = async () => {
		'use server'

		await fetch(`${process.env.API_URL}/api/module/${id}/cards`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				stage: 1,
			}),
			cache: 'no-cache',
		})
	}

	const questions: LearningQuestion[] = []

	const questionsLength = Math.min(cards.length, 10)

	let cardsCopy = cards.slice()

	for (let i = 0; i < questionsLength; i++) {
		const card = cards[i]

		if (card.stage === 1) {
			const question: SelectQuestion = {
				cardId: card.id,
				termin: card.termin,
				definitionIndex: 0,
				variants: [card.definition],
			}

			cardsCopy = cardsCopy.filter((_, index) => index !== i)

			const variantsLength = Math.min(4, cards.length)

			while (question.variants.length < variantsLength) {
				const randomIndex = Math.floor(Math.random() * cardsCopy.length)
				const variant = cardsCopy[randomIndex].definition
				if (Math.random() > 0.5) {
					question.variants.push(variant)
				} else {
					question.variants.unshift(variant)
					question.definitionIndex++
				}
				cardsCopy = cardsCopy.filter((_, index) => index !== randomIndex)
			}

			questions.push(question)
			cardsCopy = cards.slice()
		} else if (card.stage === 2) {
			const question: TestQuestion = {
				cardId: card.id,
				termin: card.termin,
				definition: card.definition,
			}
			questions.push(question)
		}
	}

	return (
		<main>
			<Container className={styles.body} width={1000}>
				<Learning questions={questions} reset={resetStage} />
			</Container>
		</main>
	)
}
