import Container from '@/components/container/Container'
import LoginForm from '@/components/modals/authModal/forms/LoginForm'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from '../page.module.scss'

export const metadata: Metadata = {
	title: 'Questions | Login',
	description: '',
}

export default function Page() {
	const cookieStorage = cookies()

	if (cookieStorage.has('token')) redirect('/')
	return (
		<main>
			<Container className={styles.body}>
				<LoginForm />
				<p className={styles.account}>
					Нет акаунта?{' '}
					<Link href='/auth/register' className={styles.link}>
						Создайте
					</Link>
				</p>
			</Container>
		</main>
	)
}
