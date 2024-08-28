'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import AuthModal from '../modals/authModal/AuthModal'
import styles from './SignInBtn.module.scss'

export default function SignInBtn() {
	const [isModalOpen, setModalOpen] = useState(false)

	const handleClick = () => {
		toast('Пока не доступно', {
			position: 'top-right',
			duration: 2000,
		})
	}

	return (
		<>
			<button className={styles.body} onClick={handleClick}>
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
