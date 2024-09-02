'use client'

import cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './SignOutBtn.module.scss'

export default function SignOutBtn() {
	const router = useRouter()
	const handleSignOut = () => {
		cookies.remove('token')
		router.push('/auth/login')
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.body}>
				<Image src='/user.svg' alt='User' width={32} height={32} />
			</div>
			<div className={styles.tools}>
				<Link href='/profile' className={styles.tool}>
					Профиль
				</Link>
				<Link href='/profile/sfakfjsaklf/modules' className={styles.tool}>
					Модули
				</Link>
				<button onClick={handleSignOut} className={styles.tool}>
					Выйти
				</button>
			</div>
		</div>
	)
}
