import { useState } from 'react'
import type { SelectQuestion } from '../../../types/question'
import styles from '../Question.module.scss'

import classNames from 'classnames'

export default function Question1({
	question,
	nextQuestion,
}: {
	question: SelectQuestion
	nextQuestion: () => void
}) {
	const upgradeStage = async () => {
		const response = await fetch(
			`http://localhost:3000/api/card/${question.cardId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					stage: 2,
				}),
				cache: 'no-cache',
			}
		)
	}

	const handleAnswer = (index: number) => {
		setSelectedAnswer(index)

		if (index === question.definitionIndex) {
			upgradeStage()
			nextQuestion()

			setSelectedAnswer(null)
		}
	}

	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

	return (
		<div className={styles.question}>
			<div className={styles.label}>Определение</div>
			<div className={styles.termin}>{question.termin}</div>
			<div className={styles.explanation}>Выберите правильный ответ</div>
			<div
				className={classNames(
					styles.answers,
					selectedAnswer !== null && styles.disabled
				)}
			>
				{question.variants.map((answer: string, index: number) => (
					<div
						className={classNames(styles.answer, {
							[styles.right]:
								selectedAnswer === index && index === question.definitionIndex,
							[styles.wrong]: selectedAnswer === index,
							[styles.misstake]:
								selectedAnswer !== null && index === question.definitionIndex,
						})}
						key={index}
						onClick={() => handleAnswer(index)}
					>
						<span className={styles.number}>{index + 1}</span>
						{answer}
					</div>
				))}
			</div>
			{selectedAnswer !== null && (
				<button
					onClick={() => {
						nextQuestion()
						setSelectedAnswer(null)
					}}
					className={styles.nextBtn}
				>
					Дальше
				</button>
			)}
		</div>
	)
}
