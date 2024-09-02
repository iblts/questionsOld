'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './SignInBtn.module.scss'

export default function SignInBtn() {
	return (
		<Link href='/auth/login' className={styles.body}>
			<Image src='/user.svg' alt='User' width={32} height={32} />
		</Link>
	)
}
