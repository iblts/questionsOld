import Container from '@/components/container/Container'
import styles from './page.module.scss'

export default function Loading() {
	return (
		<main>
			<Container className={styles.body} width={1000}>
				<div className={styles.titleSkeleton} />
				<div className={styles.actions}>
					<div className={styles.actionSkeleton} />
					<div className={styles.actionSkeleton} />
					<div className={styles.actionSkeleton} />
					<div className={styles.actionSkeleton} />
				</div>
				<div className={styles.cardsViewerSkeleton} />
			</Container>
		</main>
	)
}
