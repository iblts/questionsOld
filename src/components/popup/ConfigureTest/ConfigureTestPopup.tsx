import { useModuleContext } from '../../contexts/module'
import Plus from '../../icons/Plus'
import styles from './ConfigureTestPopup.module.scss'
import Settings from './Settings'

export default function ConfigureTestPopup({
	onClose,
	moduleId,
}: {
	onClose: () => void
	moduleId: number
}) {
	const handleStart = () => {}
	const { module } = useModuleContext()

	return (
		<div
			className={styles.overlay}
			onClick={e => {
				onClose()
				e.stopPropagation()
			}}
		>
			<div className={styles.body} onClick={e => e.stopPropagation()}>
				<div className={styles.close} onClick={onClose}>
					<Plus fill='#fff' width={40} />
				</div>
				<h3 className={styles.title}>{module.title}</h3>
				<h2>Настрой свой тест</h2>
				<Settings />
				<div className={styles.buttons}>
					<button onClick={handleStart} className={styles.startBtn}>
						Запустить
					</button>
				</div>
			</div>
		</div>
	)
}
