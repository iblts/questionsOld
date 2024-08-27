import Image from 'next/image'
import styles from './SearchLine.module.scss'

export default function SearchLine() {
	return (
		<label className={styles.body}>
			<Image src='/search.svg' alt='Search' width={24} height={24} />
			<input placeholder='Введите свой запрос' />
		</label>
	)
}
