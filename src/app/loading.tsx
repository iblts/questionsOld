import Container from '@/components/container/Container'
import styles from './page.module.css'

export default async function Home() {
	return (
		<main className={styles.main}>
			<Container>
				<p className={styles.category}>Ваши модули</p>
				<div className={styles.modules}>
					{new Array(3).fill('').map((_, i) => (
						<div className={styles.moduleSkeleton} key={i} />
					))}
				</div>
				<p className={styles.category}>Рекомендации</p>
				<div className={styles.modules}>
					{new Array(3).fill('').map((_, i) => (
						<div className={styles.moduleSkeleton} key={i} />
					))}
				</div>
			</Container>
		</main>
	)
}
