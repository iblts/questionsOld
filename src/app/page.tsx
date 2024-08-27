import Container from '@/components/container/Container'
import ModulePreview from '@/components/module/preview/ModulePreview'
import type { ModuleWithRelations } from '@/types/module'
import styles from './page.module.css'

export default async function Home() {
	const response = await fetch(`${process.env.API_URL}/module`, {
		cache: 'no-cache',
	})
	const modules = await response.json()

	return (
		<main className={styles.main}>
			<Container>
				<p className={styles.category}>Ваши модули</p>
				<div className={styles.modules}>
					{modules?.map((module: ModuleWithRelations) => (
						<ModulePreview module={module} key={module.id} />
					))}
				</div>
				<p className={styles.category}>Рекомендации</p>
				<div className={styles.modules}>
					{modules?.map((module: ModuleWithRelations) => (
						<ModulePreview module={module} key={module.id} />
					))}
				</div>
			</Container>
		</main>
	)
}
