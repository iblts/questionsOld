import styles from './Congrats.module.scss'

interface IProps {
	text: string
	buttons?: { text: string; func: () => void }[]
}

export default function Congrats({ text, buttons }: IProps) {
	return (
		<div className={styles.body}>
			<img src='/congrats.svg' alt='congrats' width={500} height={500} />
			{text}
			{buttons?.map(btn => (
				<button onClick={btn.func} key={btn.text}>
					{btn.text}
				</button>
			))}
		</div>
	)
}
