import { useState } from 'react'
import type { TestQuestion } from '../../../types/question'
import styles from '../Question.module.scss'

import Button from '@/components/UI/button/Button'
import Input from '@/components/UI/form/input/Input'

export default function Question2({
	question,
	nextQuestion,
}: {
	question: TestQuestion
	nextQuestion: () => void
}) {
	const upgradeStage = async () => {
		await fetch(`/api/cardProgress/${question.cardId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				stage: 3,
			}),
		})
	}

	const handleAnswer = () => {
		setAnswered(true)
		if (
			question.definition.toLocaleLowerCase() === answer.toLocaleLowerCase()
		) {
			upgradeStage()
			setAnswer('')
			nextQuestion()
			setAnswered(false)
		}
	}

	const handleNext = () => {
		setAnswered(false)
		setAnswer('')
		nextQuestion()
	}

	const [answer, setAnswer] = useState('')
	const [answered, setAnswered] = useState(false)

	return (
		<div className={styles.question}>
			<div className={styles.label}>Определение</div>
			<div className={styles.termin}>{question.termin}</div>
			<div className={styles.explanation}>Введите правильный ответ</div>
			<form onSubmit={e => e.preventDefault()} className={styles.form}>
				<Input
					type='text'
					name='answer'
					value={answer}
					onChange={e => !answered && setAnswer(e.target.value)}
				/>
				{answered && (
					<div>
						Нет(( Правильный ответ: {question.definition}
						<br />
						<Button
							onClick={() => {
								upgradeStage()
								handleNext()
							}}
							className={styles.nextBtn}
						>
							Я ответил правильно
						</Button>
					</div>
				)}
				{answered ? (
					<Button onClick={handleNext} className={styles.nextBtn}>
						Дальше
					</Button>
				) : (
					<Button onClick={handleAnswer} className={styles.nextBtn}>
						Ответить
					</Button>
				)}
			</form>
		</div>
	)
}
