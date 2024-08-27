import Container from '@/components/container/Container'
import styles from './page.module.scss'

export default function Loading() {
	return (
		<Container className={styles.matchCardsSkeleton}>
			{new Array(12).fill('').map((_, i) => (
				<div className={styles.matchCardSkeleton} key={i} />
			))}
		</Container>
	)
}
