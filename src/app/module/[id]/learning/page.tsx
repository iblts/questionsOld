import Container from '@/components/container/Container'
import Learning from '@/components/learning/Learning'
import { ModuleProgressWithRelations } from '@/types/module'
import {
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/types/question'
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

	const moduleProgress: ModuleProgressWithRelations = await response.json()
	const cardsProgress = moduleProgress.CardProgress

	const resetStage = async () => {
		'use server'

		await fetch(`${process.env.API_URL}/cardProgress`, {
			method: 'PUT',
			cache: 'no-cache',
			body: JSON.stringify(cardsProgress.map(card => ({ ...card, stage: 1 }))),
		})
	}

	const questions: LearningQuestion[] = []

	const questionsLength = Math.min(cardsProgress.length, 10)

	let cardsCopy = cardsProgress.slice()

	for (let i = 0; i < questionsLength; i++) {
		const card = cardsProgress[i].card

		if (cardsProgress[i].stage === 1) {
			const question: SelectQuestion = {
				cardId: cardsProgress[i].id,
				termin: card.termin,
				definitionIndex: 0,
				variants: [card.definition],
			}

			cardsCopy = cardsCopy.filter((_, index) => index !== i)

			const variantsLength = Math.min(4, cardsProgress.length)

			while (question.variants.length < variantsLength) {
				const randomIndex = Math.floor(Math.random() * cardsCopy.length)
				const variant = cardsCopy[randomIndex].card.definition
				if (Math.random() > 0.5) {
					question.variants.push(variant)
				} else {
					question.variants.unshift(variant)
					question.definitionIndex++
				}
				cardsCopy = cardsCopy.filter((_, index) => index !== randomIndex)
			}

			questions.push(question)
			cardsCopy = cardsProgress.slice()
		} else if (cardsProgress[i].stage === 2) {
			const question: TestQuestion = {
				cardId: cardsProgress[i].id,
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
