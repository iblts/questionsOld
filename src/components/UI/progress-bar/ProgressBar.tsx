import styles from './ProgressBar.module.scss'

export default function ProgressBar({
	currentLength,
	totalLength,
}: {
	currentLength: number
	totalLength: number
}) {
	return (
		<div className={styles.progressBar}>
			<div
				className={styles.progressLine}
				style={{
					width: (currentLength / totalLength) * 100 + '%',
				}}
			></div>
		</div>
	)
}
