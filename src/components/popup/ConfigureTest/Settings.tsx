import { useState } from 'react'
import { generateQuestions } from '../../../pages/test/page'
import CheckBox from '../../UI/checkbox/CheckBox'
import { useModuleContext } from '../../contexts/module'
import styles from './ConfigureTestPopup.module.scss'

export default function Settings() {
	const { module } = useModuleContext()

	const [questionsQuantity, setQuestionsQuantity] = useState(
		Math.min(module.cardsId.length, 20)
	)

	const [isActive, setIsActive] = useState(['select'])

	const handleClick = (id: string) => {
		if (isActive.includes(id)) {
			if (isActive.length <= 1) return
			setIsActive(prev => prev.filter(item => item !== id))
		} else {
			setIsActive(prev => [...prev, id])
		}
	}

	const questions = generateQuestions(
		isActive,
		module.cardsId,
		questionsQuantity
	)

	console.log(questions)

	return (
		<div className={styles.settings}>
			<label>
				Количество вопросов (максимум {module.cardsId.length})
				<input
					type='number'
					checked={true}
					min={1}
					max={module.cardsId.length}
					value={questionsQuantity}
					onChange={e => {
						const number = +e.target.value
						if (number > 0 && number <= module.cardsId.length)
							setQuestionsQuantity(+e.target.value)
					}}
				/>
			</label>
			<label>
				Правда/Ложь
				<CheckBox isActive={isActive.includes('boolean')}>
					<input type='checkbox' onClick={() => handleClick('boolean')} />
				</CheckBox>
			</label>
			<label>
				Множественный выбор
				<CheckBox isActive={isActive.includes('select')}>
					<input type='checkbox' onClick={() => handleClick('select')} />
				</CheckBox>
			</label>
			<label>
				Соотношение
				<CheckBox isActive={isActive.includes('match')}>
					<input type='checkbox' onClick={() => handleClick('match')} />
				</CheckBox>
			</label>
			<label>
				Письменные
				<CheckBox isActive={isActive.includes('write')}>
					<input type='checkbox' onClick={() => handleClick('write')} />
				</CheckBox>
			</label>
		</div>
	)
}
