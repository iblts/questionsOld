import ProgressBar from '@/components/UI/progress-bar/ProgressBar'
import Container from '@/components/container/Container'
import styles from './page.module.scss'

export default function loading() {
	return (
		<main className={styles.body}>
			<Container width={1000}>
				<ProgressBar currentLength={0} totalLength={10} />
				<div className={styles.cardSkeleton}>
					<div className={styles.lableSkeleton} />
					<div className={styles.terminSkeleton} />
					<div className={styles.lableSkeleton} />
					<div className={styles.inputSkeleton} />
					<div className={styles.buttonSkeleton} />
				</div>
			</Container>
		</main>
	)
}
