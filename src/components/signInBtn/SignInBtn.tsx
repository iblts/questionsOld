'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import AuthModal from '../modals/authModal/AuthModal'
import styles from './SignInBtn.module.scss'

export default function SignInBtn() {
	const [isModalOpen, setModalOpen] = useState(false)

	return (
		<>
			<button className={styles.body} onClick={() => setModalOpen(true)}>
				<Image src='/user.svg' alt='User' width={32} height={32} />
			</button>
			{isModalOpen &&
				createPortal(
					<AuthModal onClose={() => setModalOpen(false)} />,
					document.body
				)}
		</>
	)
}
