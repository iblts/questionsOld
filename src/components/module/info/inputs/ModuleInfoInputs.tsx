import Form from '@/components/UI/form/Form'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'

export default function ModuleInfoInputs({
	title,
	description,
	setTitle,
	setDescription,
}: {
	title: string
	description: string
	setTitle: (title: string) => void
	setDescription: (description: string) => void
}) {
	return (
		<Form>
			<Label>
				Название модуля
				<Input
					placeholder='Введите название модуля'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</Label>
			<Label>
				Описание модуля
				<Input
					placeholder='Введите описание модуля'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
			</Label>
		</Form>
	)
}
