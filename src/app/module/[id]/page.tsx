import Button from '@/components/UI/button/Button'
import CardsViewer from '@/components/cardsViewer/CardsViewer'
import Container from '@/components/container/Container'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params

	const response = await fetch(`/api/module/${id}`, {
		cache: 'no-cache',
	})

	const { module: curModule } = await response.json()

	return (
		<main>
			<Container className={styles.body} width={1000}>
				<h1 className={styles.title}>{curModule.title}</h1>
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
				<CardsViewer cards={curModule.cards} />
			</Container>
		</main>
	)
}
