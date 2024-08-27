import type { ModuleWithRelations } from '@/types/module'
import Link from 'next/link'
import styles from './ModulePreview.module.scss'

export default function ModulePreview({
	module,
}: {
	module: ModuleWithRelations
}) {
	return (
		<Link href={`/module/${module.id}`} className={styles.module}>
			<p className={styles.title}>{module.title}</p>
			<span className={styles.terms}>{module.cards.length} terms</span>
			<p className={styles.description}>{module.description}</p>
			<p className={styles.author}>{module.author?.name || 'Anonymous'}</p>
		</Link>
	)
}
