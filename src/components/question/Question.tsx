import type { LearningQuestion } from '@/types/question'
import Question1 from './stage1/Question'
import Question2 from './stage2/Question'

export default function Question({
	question,
	nextQuestion,
}: {
	question: LearningQuestion
	nextQuestion: () => void
}) {
	return (
		<>
			{'variants' in question ? (
				<Question1 question={question} nextQuestion={nextQuestion} />
			) : (
				<Question2 question={question} nextQuestion={nextQuestion} />
			)}
		</>
	)
}
