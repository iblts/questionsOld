import Container from '@/components/container/Container'
import Match from '@/components/match/Match'
import type { MatchQuestion } from '@/types/question'
import type { Card } from '@prisma/client'
import { cookies } from 'next/headers'
import styles from './page.module.scss'

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params

	const cookieStorage = cookies()
	const token = cookieStorage.get('token')?.value!

	const response = await fetch(`${process.env.API_URL}/moduleProgress/${id}`, {
		cache: 'no-cache',
		headers: {
			Authorization: token,
		},
	})

	if (!response.ok) return

	const shuffle = (array: unknown[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
	}

	const moduleProgress = await response.json()

	const cards: Card[] = moduleProgress.module.cards

	const matchCards: MatchQuestion[] = []

	const questionsLength = Math.min(cards.length, 12)

	let cardsCopy = cards.slice()

	while (matchCards.length < questionsLength) {
		const randomIndex = Math.floor(Math.random() * cardsCopy.length)
		const variant = cardsCopy[randomIndex]
		const matchCardTermin: MatchQuestion = {
			cardId: variant.id,
			text: variant.termin,
		}
		const matchCardDefinition: MatchQuestion = {
			cardId: variant.id,
			text: variant.definition,
		}
		matchCards.push(matchCardTermin, matchCardDefinition)
		cardsCopy = cardsCopy.filter((_, index) => index !== randomIndex)
	}

	shuffle(matchCards)

	return (
		<main>
			<Container className={styles.body}>
				<Match matchCards={matchCards} />
			</Container>
		</main>
	)
}
