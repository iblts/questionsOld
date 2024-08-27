'use client'

import { LearningQuestion } from '@/types/question'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../UI/button/Button'
import ProgressBar from '../UI/progress-bar/ProgressBar'
import Question from '../question/Question'
import styles from './Learning.module.scss'

export default function Learning({
	questions,
	reset,
}: {
	questions: LearningQuestion[]
	reset: () => Promise<void>
}) {
	const [questionIndex, setQuestionIndex] = useState(0)
	const question = questions[questionIndex]

	const router = useRouter()

	return (
		<div className={styles.body}>
			<ProgressBar
				currentLength={questionIndex}
				totalLength={questions.length}
			/>
			{questionIndex === questions.length ? (
				<div className={styles.congratulations}>
					{questions.length === 0 ? (
						<>
							Вопросы закончились
							<Button
								onClick={async () => {
									await reset()
									router.refresh()
								}}
							>
								Заново
							</Button>
						</>
					) : (
						<Button
							onClick={async () => {
								router.refresh()
								setQuestionIndex(0)
							}}
						>
							Далее
						</Button>
					)}
				</div>
			) : (
				<Question
					question={question}
					nextQuestion={() => setQuestionIndex(prev => prev + 1)}
				/>
			)}
		</div>
	)
}
