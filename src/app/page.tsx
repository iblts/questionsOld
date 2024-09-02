import Container from '@/components/container/Container'
import ModulePreview from '@/components/module/preview/ModulePreview'
import type { ModuleWithRelations } from '@/types/module'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export default async function Home() {
	let modules: ModuleWithRelations[] = []

	const cookieStorage = cookies()
	if (!cookieStorage.has('token')) redirect('/auth/login')

	try {
		const response = await fetch(`${process.env.API_URL}/module`, {
			cache: 'no-cache',
		})
		modules = await response.json()
	} catch (e) {
		console.error(`${process.env.API_URL}/module Failed to fetch modules:`, e)
		return null
	}

	return (
		<main className={styles.main}>
			<Container>
				<p className={styles.category}>Ваши модули</p>
				<div className={styles.modules}>
					{modules.length > 0 &&
						modules?.map((module: ModuleWithRelations) => (
							<ModulePreview module={module} key={module.id} />
						))}
				</div>
				<p className={styles.category}>Рекомендации</p>
				<div className={styles.modules}>
					{modules.length > 0 &&
						modules?.map((module: ModuleWithRelations) => (
							<ModulePreview module={module} key={module.id} />
						))}
				</div>
			</Container>
		</main>
	)
}
