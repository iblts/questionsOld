import Link from 'next/link'
import Button from '../UI/button/Button'
import Container from '../container/Container'
import styles from './Header.module.scss'
import AuthButton from './authBtn/AuthButton'
import SearchLine from './searchLine/SearchLine'

export default function Header() {
	return (
		<header>
			<Container className={styles.body}>
				<Link href='/' className={styles.logo}>
					QUESTIONS
				</Link>
				<SearchLine />
				<div className={styles.team}>
					<Link href='/create'>
						<Button className={styles.createBtn}>Создать модуль</Button>
					</Link>
					<AuthButton />
				</div>
			</Container>
		</header>
	)
}
