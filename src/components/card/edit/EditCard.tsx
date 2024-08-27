'use client'

import InputGroup from '@/components/UI/form/InputGroup'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
import { Card } from '@prisma/client'
import styles from './EditCard.module.scss'

export default function EditCard({
	card,
	setCard,
}: {
	card: { id: number } & Pick<Card, 'termin' | 'definition'>
	setCard: (card: { id: number } & Pick<Card, 'termin' | 'definition'>) => void
}) {
	return (
		<li className={styles.body}>
			<InputGroup>
				<Label>
					<Input
						placeholder='Введите термин'
						value={card.termin}
						onChange={e => setCard({ ...card, termin: e.target.value })}
					/>
					Термин
				</Label>

				<Label>
					<Input
						placeholder='Введите определение'
						value={card.definition}
						onChange={e => setCard({ ...card, definition: e.target.value })}
					/>
					Определение
				</Label>
			</InputGroup>
		</li>
	)
}
