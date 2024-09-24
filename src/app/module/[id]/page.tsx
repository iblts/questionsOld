import Button from '@/components/UI/button/Button'
import CardsViewer from '@/components/cardsViewer/CardsViewer'
import Container from '@/components/container/Container'
import { ModuleWithRelations } from '@/types/module'
import { ModuleProgress } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id

	const cookieStorage = cookies()
	const token = cookieStorage.get('token')

	if (!token) redirect('/auth/login')

	const verified = verify(token.value, process.env.SECRET_KEY!) as {
		id: string
	}

	if (!verified?.id) {
		cookieStorage.delete('token')
		redirect('/auth/login')
	}

	await fetch(`${process.env.API_URL}/moduleProgress`, {
		method: 'POST',
		cache: 'no-cache',
		body: JSON.stringify({
			userId: verified.id,
			moduleId: id,
		}),
		headers: {
			Authorization: token.value,
		},
	})

	const fetchedModule = await fetch(
		`${process.env.API_URL}/moduleProgress/${id}`,
		{
			cache: 'no-store',
			headers: {
				Authorization: token.value,
			},
		}
	)

	const curModule: ModuleProgress & {
		module: ModuleWithRelations
	} = await fetchedModule.json()

	await fetch(`${process.env.API_URL}/cardProgress`, {
		method: 'POST',
		cache: 'no-cache',
		body: JSON.stringify(
			curModule.module.cards.map(card => ({
				cardId: card.id,
				moduleId: module.id,
			}))
		),
		headers: {
			Authorization: token.value,
		},
	})

	return (
		<main>
			<Container className={styles.body} width={1000}>
				<h1 className={styles.title}>{curModule.module.title}</h1>
				<div className={styles.actions}>
					<Link href={`/module/${id}/flashcards`}>
						<Button variant='outlined' className={styles.action}>
							<Image src='/flashcards.svg' alt='cards' width={24} height={24} />
							Карточки
						</Button>
					</Link>

					<Link href={`/module/${id}/learning`}>
						<Button variant='outlined' className={styles.action}>
							<Image
								src='/learning.svg'
								alt='learning'
								width={24}
								height={24}
							/>
							Заучивание
						</Button>
					</Link>

					<Link href={`/module/${id}/test`}>
						<Button variant='outlined' className={styles.action}>
							<Image src='/test.svg' alt='test' width={24} height={24} />
							Тест
						</Button>
					</Link>

					<Link href={`/module/${id}/match`}>
						<Button variant='outlined' className={styles.action}>
							<Image src='/match.svg' alt='match' width={24} height={24} />
							Подбор
						</Button>
					</Link>
				</div>
				<CardsViewer cards={curModule.module.cards} />
			</Container>
		</main>
	)
}
