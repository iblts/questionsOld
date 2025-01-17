'use client'

import Button from '@/components/UI/button/Button'
import EditCard from '@/components/card/edit/EditCard'
import Container from '@/components/container/Container'
import ModuleInfoInputs from '@/components/module/info/inputs/ModuleInfoInputs'
import { Card } from '@prisma/client'
import cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.scss'

export default function Page() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const [cards, setCards] = useState<
		({ id: number } & Pick<Card, 'termin' | 'definition'>)[]
	>([
		{
			id: 0,
			termin: '',
			definition: '',
		},
		{
			id: 1,
			termin: '',
			definition: '',
		},
	])

	let currentId = 2

	const router = useRouter()
	if (!cookies.get('token')) router.push('/auth/login')

	const handleCreateModule = async () => {
		const notEmptyCards = cards.filter(
			card => card.definition.trim() !== '' && card.termin.trim() !== ''
		)

		if (notEmptyCards.length > 1 && title.length > 0) {
			const token = cookies.get('token')

			if (!token) {
				router.push('/auth/login')
				return
			}

			console.log(token)

			const user = verify(token, `${process.env.SECRET_KEY}`) as { id: string }

			console.log(user)

			try {
				const newModule = await fetch(`${process.env.API_URL}/module`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						authorId: user.id,
					}),
				})

				const createdModule = await newModule.json()

				await fetch(`${process.env.API_URL}/card`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(
						cards.map(card => ({
							termin: card.termin,
							definition: card.definition,
							moduleId: createdModule.id,
						}))
					),
				})

				return createdModule
			} catch (error) {
				throw new Error(`Error on create: ${error}`)
			}
		}
	}

	return (
		<main>
			<Container>
				<ModuleInfoInputs
					title={title}
					description={description}
					setTitle={setTitle}
					setDescription={setDescription}
				/>
				<ul className={styles.cards}>
					{cards.map((el, i) => (
						<EditCard
							card={el}
							setCard={card =>
								setCards(prev => [
									...prev.slice(0, i),
									card,
									...prev.slice(i + 1),
								])
							}
							key={el.id}
						/>
					))}
					<Button
						onClick={() => {
							setCards([
								...cards,
								{ id: currentId, termin: '', definition: '' },
							])
							currentId++
						}}
						className={styles.button}
					>
						Добавить термин
					</Button>
				</ul>
				<Button
					onClick={() => {
						handleCreateModule()
					}}
					className={styles.button}
				>
					Создать модуль
				</Button>
			</Container>
		</main>
	)
}
